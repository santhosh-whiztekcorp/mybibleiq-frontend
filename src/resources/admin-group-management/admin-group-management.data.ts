/* ---- Default Filters ---- */
export const defaultAdminGroupListFilters = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
  q: undefined,
  type: undefined,
  status: undefined,
  privacy: undefined,
};

export const defaultAdminGroupReportsListFilters = {
  page: 1,
  pageSize: 20,
  status: undefined,
};

export const defaultAdminGroupAnnouncementsListFilters = {
  page: 1,
  pageSize: 20,
  status: undefined,
};

export const defaultAdminGroupActivityLogListFilters = {
  page: 1,
  pageSize: 20,
  eventType: undefined,
  dateFrom: undefined,
  dateTo: undefined,
};

export const defaultAdminGroupMembersListFilters = {
  page: 1,
  pageSize: 20,
  q: undefined,
  role: undefined,
  status: undefined,
};

export const defaultAdminGroupAssignmentsListFilters = {
  page: 1,
  pageSize: 20,
  status: undefined,
  type: undefined,
};

export const defaultAdminGroupLeaderboardListFilters = {
  page: 1,
  pageSize: 20,
  period: "all_time" as const,
  role: undefined,
};
