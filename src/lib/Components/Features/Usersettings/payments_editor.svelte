<script lang="ts">
  import { TabsContent } from "$lib/components/ui/tabs";
  import { CardContent } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Plus, CreditCard, Trash } from "lucide-svelte";
  import { firestore, useAuthStore } from "$lib/Firebase/firebase_init";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import LoadingBar from "$lib/components/Utilities/loading_bar.svelte";
  import type { AddedPaymentCard, Bill } from "$lib/Types/payments";
  import { collection, doc, getDocs } from "firebase/firestore";
  import { get } from "svelte/store";
  import { formatDate } from "$lib/Logic/format_date";

  let showBillingHistory = false;

  const auth = useAuthStore();

  async function fetchCards(): Promise<AddedPaymentCard[]> {
    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "added_cards"
    );

    const snapshot = await getDocs(collectionRef);

    return snapshot.docs.map((doc) => {
      return {
        tokenID: doc.id,
        ...doc.data(),
      } as AddedPaymentCard;
    });
  }

  async function viewPaymentHistory(): Promise<Bill[]> {
    const cards = await fetchCards();

    let payments: Bill[] = [];

    const collectionRef = collection(
      firestore,
      "Users",
      get(auth).user?.uid || "",
      "added_cards"
    );

    for (const card of cards) {
      const ref = collection(collectionRef, card.tokenID, "charges");

      // Await the async operation
      const bills = await getDocs(ref);

      bills.forEach((bill) => {
        payments.push(bill.data() as Bill);
      });
    }

    return payments;
  }
</script>

<!-- Billing Settings -->
<TabsContent value="billing">
  <CardContent class="space-y-6">
    <div class="space-y-4">
      <div class="space-y-4">
        <h4 class="font-medium">Payment Methods</h4>
        {#if $auth.user}
          {#await fetchCards()}
            <LoadingBar />
          {:then cards}
            {#each cards as card}
              <div
                class="flex items-center justify-between p-4 border rounded-lg"
              >
                <div class="flex items-center gap-4">
                  <CreditCard class="h-6 w-6" />
                  <div>
                    <p class="font-medium">{card.cardName}</p>
                    <p class="text-sm text-muted-foreground">
                      {formatDate(card.added.toMillis())}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Trash /></Button>
              </div>
            {/each}
          {:catch error}
            <p class="text-red-500">{error.message}</p>
          {/await}
        {/if}
        <Button variant="outline" class="w-full">
          <Plus class="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
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
