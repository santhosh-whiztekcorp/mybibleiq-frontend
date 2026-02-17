"use client";

import { BadgeCard } from "../BadgeCard/BadgeCard";
import { BadgeCardListProps } from "./BadgeCardList.types";

export function BadgeCardList({ items, onEdit, onDelete, onPublish, onArchive, onClone }: BadgeCardListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 text-sm">No badges found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <BadgeCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onArchive={onArchive}
          onClone={onClone}
        />
      ))}
    </div>
  );
}
