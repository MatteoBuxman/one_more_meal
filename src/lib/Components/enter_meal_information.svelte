<script lang="ts">
  import type { Meal } from "$lib/Types/meals";


let name = $state('');
let description = $state('');
let image = $state(undefined);
let amount = $state(1);

let {uuid, addMealHandler} : {uuid: string, addMealHandler: (meal: Meal) => void} = $props();
</script>

<div class=" bg-gray-100 flex items-center justify-center mt-3">
    <div class="w-full max-w-lg bg-white ">
        <span class="badge badge-neutral text-xs ">Meal ID: {uuid}</span>
      <form  class="space-y-4">
        <!-- Meal Name -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Meal Name</span>
          </label>
          <input
            type="text"
            bind:value={name}
            placeholder="Enter the meal name"
            required
            class="input input-bordered w-full"
          />
        </div>
  
        <!-- Optional Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Description (Optional)</span>
          </label>
          <textarea
            bind:value={description}
            placeholder="Add a description"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>
  
        <!-- Optional Image -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Upload Image (Optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            class="file-input file-input-bordered w-full"
          />
        </div>
  
        <!-- Amount of Meals -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Amount of Meals</span>
          </label>
          <input
            type="number"
            bind:value={amount}
            placeholder="Enter amount"
            required
            min="1"
            class="input input-bordered w-full"
          />
        </div>
  
        <!-- Submit Button -->
        <div class="form-control mt-6">
          <button onclick={()=> addMealHandler({uuid, name, description, image})} type="submit" class="btn btn-primary w-full">Add Meal</button>
        </div>
      </form>
    </div>
  </div>