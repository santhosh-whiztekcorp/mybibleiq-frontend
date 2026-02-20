"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { type MemberDataTableProps } from "./MemberDataTable.types";
import { useMemberDataTableColumns } from "./MemberDataTable.hooks";

export const MemberDataTable: React.FC<MemberDataTableProps> = ({
  data,
  isLoading,
  total,
  pagination,
  onPaginationChange,
  onManage,
}) => {
  const columns = useMemberDataTableColumns(onManage);

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pagination={{
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 20,
        total,
      }}
      onPaginationChange={onPaginationChange}
      showPagination={true}
      showSearch={false}
      entriesCount={data.length}
      entriesCountLabel="Members"
    />
  );
};
