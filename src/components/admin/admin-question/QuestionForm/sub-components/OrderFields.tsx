"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowDown } from "lucide-react";
import { InputController } from "@/components/form-controllers";
import type { OrderFormErrors } from "../QuestionForm.types";

export function OrderFields() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "order.items",
  });

  const orderErrors = errors.order as OrderFormErrors | undefined;

  // Initialize if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      append({ text: "", order: 0 });
      append({ text: "", order: 1 });
    }
  }, [fields.length, append]);

  // Sync order values whenever fields change
  React.useEffect(() => {
    fields.forEach((field, index) => {
      // @ts-expect-error - order property exists on field
      if (field.order !== index) {
        setValue(`order.items.${index}.order`, index, { shouldValidate: true });
      }
    });
  }, [fields, setValue]);

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-[#656A73] uppercase tracking-wider">Sequence Items</label>
        <p className="text-[11px] text-[#656A73] font-medium italic pb-1">
          Add items in the correct chronological or logical order.
        </p>

        {fields.map((field, index) => (
          <div key={field.id} className="group animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg flex items-center justify-center text-sm font-bold text-[#656A73] shrink-0">
                {index + 1}
              </div>

              <div className="flex-1">
                <InputController
                  control={control}
                  name={`order.items.${index}.text`}
                  placeholder={`Step ${index + 1}...`}
                  variant="adminPrimary"
                  error={orderErrors?.items?.[index]?.text?.message}
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 border border-[#E2E8F0] rounded-lg"
                onClick={() => handleRemove(index)}
                disabled={fields.length <= 2}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {index < fields.length - 1 && (
              <div className="flex justify-start pl-14 py-2 opacity-50">
                <ArrowDown className="h-4 w-4 text-[#B4B4B4]" />
              </div>
            )}
          </div>
        ))}

        {orderErrors?.items?.root && (
          <p className="text-xs text-red-500 font-medium">{orderErrors.items.root.message}</p>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full h-12 border-dashed border-[#E2E8F0] text-[#656A73] hover:bg-[#F9FAFB] font-bold uppercase text-[11px] tracking-wider"
        onClick={() => {
          append({ text: "", order: fields.length });
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Next Item
      </Button>
    </div>
  );
}
