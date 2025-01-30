<script lang="ts">
  import { TabsContent } from "$lib/components/ui/tabs";
  import { CardContent } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Plus, CreditCard, Trash, Key } from "lucide-svelte";
  import { firestore, useAuthStore } from "$lib/firebase/firebase_init";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import type { AddedPaymentCard, Bill } from "$lib/types/payments";
  import {
    collection,
    doc,
    getDocs,
    updateDoc,
    writeBatch,
  } from "firebase/firestore";
  import { get } from "svelte/store";
  import { formatDate } from "$lib/function_utilities/format_date";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as RadioGroup from "$lib/components/ui/radio-group/index";
  import debounce from "debounce";
  import { onMount } from "svelte";
  import { FailedBackendFetch } from "$lib/errors/client/network_requests";
  import ErrorModal from "$lib/components/Errors/error_modal.svelte";

  let showBillingHistory = $state(false);

  const auth = useAuthStore();

  let cards: AddedPaymentCard[] | null = $state(null);

  let error_message = $state("");
  let show_error = $state(false);

  onMount(() => {
    fetchCards();
  });

  async function fetchCards() {
    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "added_cards"
    );

    const snapshot = await getDocs(collectionRef);

    cards = snapshot.docs
      .map((doc) => {
        return {
          tokenID: doc.id,
          ...doc.data(),
        } as AddedPaymentCard;
      })
      .sort((a, b) => b.added.toMillis() - a.added.toMillis());
  }

  async function viewPaymentHistory(): Promise<Bill[]> {
    let payments: Bill[] = [];

    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "added_cards"
    );

    for (const card of cards as AddedPaymentCard[]) {
      const ref = collection(collectionRef, card.tokenID, "charges");

      // Await the async operation
      const bills = await getDocs(ref);

      bills.forEach((bill) => {
        payments.push(bill.data() as Bill);
      });
    }

    return payments;
  }

  function makeNameChangeHandler(tokenID: string) {
    function handleNameChange(e: Event) {
      const target = e.target as HTMLInputElement;

      const docRef = doc(
        firestore,
        "Users",
        get(auth).user?.uid || "",
        "added_cards",
        tokenID
      );

      updateDoc(docRef, {
        cardName: target.value,
      }).then(() => {
        console.log("Name changed to: ", target.value);
      });
    }

    return debounce(handleNameChange, 2500);
  }

  function changeDefaultCard(tokenID: string) {
    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "added_cards"
    );
    const adjustment = writeBatch(firestore);

    //Unset old default
    const oldDefaultID = cards?.find((card) => card.default === true)?.tokenID;
    const oldDefault = doc(collectionRef, oldDefaultID);
    adjustment.update(oldDefault, {
      default: false,
    });

    //Set new default
    const newDefault = doc(collectionRef, tokenID);
    adjustment.update(newDefault, {
      default: true,
    });

    adjustment.commit();

    //Update the cards array to reflect the new default card
    cards = (cards as AddedPaymentCard[]).map((card) => {
      if (card.tokenID === tokenID) {
        return { ...card, default: true };
      } else {
        return { ...card, default: false };
      }
    });
  }

  async function postForm(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const body = new URLSearchParams(formData as any).toString();

    try {
      const response = await fetch("/api/signformdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (!response.ok) {
        throw new FailedBackendFetch("Failed to sign form data", await response.json());
      }

      const json = await response.json();
      const signature = json.signature;

      const newInput = document.createElement("input");

      newInput.type = "hidden";
      newInput.name = "signature";
      newInput.value = signature;

      // Append the input to the form
      form.appendChild(newInput);

      console.log(form);

      form.submit();
    } catch (error) {
      if(error instanceof FailedBackendFetch) {
        error_message = error.error_reply_from_server.error_message;
        show_error = true;
      }
    }
  }
</script>

<ErrorModal bind:isOpen={show_error} {error_message}/>

<!-- Billing Settings -->
<TabsContent value="billing">
  <CardContent class="space-y-6">
    <div class="space-y-4">
      <div class="space-y-4">
        <h4 class="font-medium">Payment Methods</h4>
        <p class="text-sm text-gray-500">
          Please click on a card to select it as your preferred payment method.
          You can change the name of a card by clicking on its name.
        </p>
        {#if !$auth.user || !cards}
          <LoadingBar />
        {:else}
          <RadioGroup.Root
            onValueChange={changeDefaultCard}
            value={cards.find((card) => card.default)?.tokenID}
          >
            {#each cards as card, i (card.tokenID)}
              <div
                class="flex items-center justify-between p-4 border rounded-lg {card.default
                  ? 'border border-solid border-gray-400 rounded'
                  : ''}"
              >
                <RadioGroup.Item value={card.tokenID} id={`r${i}`} />
                <div class="flex items-center gap-4">
                  <CreditCard class="h-6 w-6" />
                  <div>
                    <Input
                      value={card.card_name}
                      class="text-sm p-1 h-[1rem] rounded-none mb-2"
                      oninput={makeNameChangeHandler(card.tokenID)}
                    />
                    <p class="text-sm text-muted-foreground">
                      {formatDate(card.added.toMillis())}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Trash /></Button>
              </div>
            {/each}
          </RadioGroup.Root>
        {/if}
        <form
          action="https://sandbox.payfast.co.za​/eng/process"
          method="post"
          onsubmit={postForm}
        >
          <input type="hidden" name="merchant_id" value="10032305" />
          <input type="hidden" name="merchant_key" value="pgk27qkk86ibo" />
          <input
            type="hidden"
            name="return_url"
            value="https://867b-102-132-162-197.ngrok-free.app/usersettings"
          />
          <input
            type="hidden"
            name="cancel_url"
            value="https://867b-102-132-162-197.ngrok-free.app/usersettings"
          />
          <input
            type="hidden"
            name="notify_url"
            value="https://867b-102-132-162-197.ngrok-free.app/api/registertoken"
          />
          <input type="hidden" name="amount" value="0" />
          <input type="hidden" name="item_name" value="New_Card" />
          <input type="hidden" name="custom_str1" value={$auth.user?.uid} />
          <input type="hidden" name="custom_str2" value="New_Card" />
          <input type="hidden" name="subscription_type" value="2" />

          <Button variant="outline" type="submit" class="w-full">
            <Plus class="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </form>
      </div>

      <Separator />

      <div class="space-y-4">
        <h4 class="font-medium">Billing History</h4>
        <div class="space-y-2">
          {#if showBillingHistory}
            {#await viewPaymentHistory()}
              <LoadingBar />
            {:then payments}
              {#each payments as payment}
                <div class="flex justify-between items-center text-sm">
                  <span>{formatDate(payment.timestamp.toMillis())}</span>
                  <span>{payment.reason}</span>
                  <span>R {(payment.amount / 100).toFixed(2)}</span>
                </div>
              {/each}
            {:catch error}
              <p class="text-red-500">{error.message}</p>
            {/await}
          {:else}
            <Button
              variant="outline"
              class="w-full"
              onclick={() => (showBillingHistory = !showBillingHistory)}
            >
              View Billing History
            </Button>
          {/if}
        </div>
      </div>
    </div>
  </CardContent>
</TabsContent>
