<script lang="ts">
  let step = $state(1);
  let formData = $state({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  function handleSubmit() {
    console.log("Submit", formData);
  }
</script>

<div class="max-w-md mx-auto p-6">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <!-- Progress Bar -->
      <ul class="steps steps-horizontal w-full mb-8">
        <li class="step {step >= 1 ? 'step-primary' : ''}">Account</li>
        <li class="step {step >= 2 ? 'step-primary' : ''}">Personal Info</li>
        <li class="step {step >= 3 ? 'step-primary' : ''}">Location</li>
        <li class="step {step >= 4 ? 'step-primary' : ''}">Payment</li>
      </ul>

      <!-- Form Steps -->
      {#if step === 1}
        <div class="space-y-4">
          <h1 class="text-2xl font-bold mb-6">Contact Info.</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
              <input
                type="email"
                bind:value={formData.email}
                class="input input-bordered"
                placeholder="Enter your email"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
              <input
                type="password"
                bind:value={formData.password}
                class="input input-bordered"
                placeholder="Enter your password"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
              <input
                type="password"
                bind:value={formData.confirmPassword}
                class="input input-bordered"
                placeholder="Confirm your password"
              />
            </label>
          </div>
        </div>
      {:else if step === 2}
        <div class="space-y-4">
          <h1 class="text-2xl font-bold mb-6">Personal Information.</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">First Name</span>
              <input
                type="text"
                bind:value={formData.firstName}
                class="input input-bordered"
                placeholder="Enter your first name"
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Last Name</span>
              <input
                type="text"
                bind:value={formData.lastName}
                class="input input-bordered"
                placeholder="Enter your last name"
              />
            </label>
          </div>
        </div>
      {:else if step === 3}
        <div class="space-y-4">
          <div>
            <h1 class="text-2xl font-bold mb-1">Location Information.</h1>
            <p class="text-sm text-gray-500 mb-4">
              We securely store your address so meals can be picked up without
              you entering your address every time.
            </p>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Address</span>
              <input
                type="text"
                bind:value={formData.address}
                class="input input-bordered"
                placeholder="Enter your address"
              />
            </label>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">City</span>
                <input
                  type="text"
                  bind:value={formData.city}
                  class="input input-bordered"
                  placeholder="City"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">State</span>
                <input
                  type="text"
                  bind:value={formData.state}
                  class="input input-bordered"
                  placeholder="State"
                />
              </label>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">ZIP Code</span>
              <input
                type="text"
                bind:value={formData.zipCode}
                class="input input-bordered"
                placeholder="ZIP Code"
              />
            </label>
          </div>
        </div>
      {:else if step === 4}
        <div class="space-y-4">
          <h1 class="text-2xl font-bold mb-6">Payment Information.</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Card Number</span>
              <input
                type="text"
                bind:value={formData.cardNumber}
                class="input input-bordered"
                placeholder="Enter your card number"
              />
            </label>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Expiry Date</span>
                <input
                  type="text"
                  bind:value={formData.expiryDate}
                  class="input input-bordered"
                  placeholder="MM/YY"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">CVV</span>
                <input
                  type="text"
                  bind:value={formData.cvv}
                  class="input input-bordered"
                  placeholder="CVV"
                />
              </label>
            </div>
          </div>
        </div>
      {/if}

      <!-- Navigation Buttons -->
      <div class="mt-6 flex gap-4">
        {#if step > 1}
          <button onclick={() => step--} class="btn btn-outline flex-1">
            Back
          </button>
        {/if}
        <button
          onclick={() => (step < 4 ? step++ : handleSubmit())}
          class="btn btn-primary flex-1"
        >
          {step === 4 ? "Create Account" : "Next"}
        </button>
      </div>
    </div>
  </div>
</div>
