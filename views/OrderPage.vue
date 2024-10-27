<script setup>
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
</script>
<template>
  <div class="container">
    <div class="d-flex justify-content-center w-100">
      <Stepper value="1" linear class="basis-[50rem] w-100">
        <StepList>
          <Step value="1">Header I</Step>
          <Step value="2">Header II</Step>
          <Step value="3">Header III</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                Content I
              </div>
            </div>
            <div class="d-flex pt-6 justify-content-end">
              <Button label="Next" @click="activateCallback('2')" />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="d-flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                Content II
              </div>
            </div>
            <div class="d-flex pt-6 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                @click="activateCallback('1')"
              />
              <Button
                label="Next"
                iconPos="right"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="d-flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                Content III
              </div>
            </div>
            <div class="pt-6">
              <Button
                label="Back"
                severity="secondary"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>
<style></style>
