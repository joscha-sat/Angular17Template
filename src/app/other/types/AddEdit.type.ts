// must have methods in add-edit dialogs
export type AddEdit = {
  initForm(): void;
  submit(): void;
  loadModelData(): void;
};
