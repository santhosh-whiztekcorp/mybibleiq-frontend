import type { UpdateDeliveryPreferencesInput } from "./user-spirit-food.types";

/* ---- Default Form Values ---- */
export const defaultUpdateDeliveryPreferencesFormValues: UpdateDeliveryPreferencesInput = {
  deliveryMethods: ["email"],
  deliveryTime: "08:00",
  timezone: "America/New_York",
  isEnabled: true,
};
