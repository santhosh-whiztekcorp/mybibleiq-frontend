export const endpoints = {
  auth: {
    /* ---- POST ---- */
    login: "/auth/local/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    register: "/auth/local/register",

    /* ---- GET ---- */
    passwordResetForm: "/auth/password-reset/form",
    passwordResetRequest: "/auth/password-reset/request",
    passwordResetConfirm: "/auth/password-reset/confirm",
    passwordResetValidate: "/auth/password-reset/validate",
  },
  email: {
    /* ---- POST ---- */
    verify: "/email/verification/verify",
    resendVerification: "/email/verification/resend",
  },
  oauth: {
    /* ---- GET ---- */
    initiate: (provider: string) => `/oauth/${provider}`,
    callback: (provider: string) => `/oauth/${provider}/callback`,

    /* ---- POST ---- */
    finalize: "/oauth/finalize",
  },
  users: {
    /* ---- GET ---- */
    getAll: "/users",
    getByEmail: "/users/by-email",
    getById: "/users/by-id",
    getByUsername: "/users/by-username",
    getEmailAvailability: "/users/check-email",
    getUsernameAvailability: "/users/check-username",

    /* ---- POST ---- */
    create: "/users",
    deviceTokens: "/users/device-tokens",

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/users/${id}`,
  },
  questionsAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/questions",
    getStats: "/admin/questions/stats/types",
    getStatsByStatus: "/admin/questions/stats/status",
    getById: (id: string) => `/admin/questions/${id}`,
    getImportReport: "/admin/questions/import/report",

    /* ---- POST ---- */
    create: "/admin/questions",
    importPreview: "/admin/questions/import/preview",
    importCommit: "/admin/questions/import/commit",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/questions/${id}`,

    /* ---- PATCH ---- */
    updateStatusById: (id: string) => `/admin/questions/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/questions/${id}`,
  },
  quizzesAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/quizzes",
    getById: (id: string) => `/admin/quizzes/${id}`,
    getStatsByStatus: "/admin/quizzes/stats/status",

    /* ---- POST ---- */
    create: "/admin/quizzes",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/quizzes/${id}`,
    replaceQuestionsById: (id: string) => `/admin/quizzes/${id}/questions`,

    /* ---- PATCH ---- */
    reorderById: (id: string) => `/admin/quizzes/${id}/reorder`,
    updateStatusById: (id: string) => `/admin/quizzes/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/quizzes/${id}`,
  },
  spiritFoodAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/entries",
    getById: (id: string) => `/admin/entries/${id}`,
    getStats: "/admin/entries/stats",
    getImportPreview: "/admin/entries/import/preview",
    getImportReport: "/admin/entries/import/report",

    /* ---- POST ---- */
    create: "/admin/entries",
    commitImport: "/admin/entries/import/commit",
    submitAndCreate: "/admin/entries/submit",
    approveById: (id: string) => `/admin/entries/${id}/approve`,
    cancelById: (id: string) => `/admin/entries/${id}/cancel`,
    submitById: (id: string) => `/admin/entries/${id}/submit`,
    requestDeleteById: (id: string) => `/admin/entries/${id}/request-delete`,
    markDeliveredById: (id: string) => `/admin/entries/${id}/mark-delivered`,
    approveDeleteById: (id: string) => `/admin/entries/${id}/approve-delete`,
    cancelDeleteById: (id: string) => `/admin/entries/${id}/cancel-delete`,
    markDeliveredWithDateById: (id: string) => `/admin/entries/${id}/mark-delivered-with-date`,

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/entries/${id}`,

    /* ---- DELETE ---- */
    forceDeleteById: (id: string) => `/admin/entries/${id}/force-delete`,
  },
  spiritFoodUser: {
    /* ---- GET ---- */
    getToday: "/spirit-food/today",
    getSaved: "/spirit-food/saved",
    getById: (id: string) => `/spirit-food/${id}`,
    getDeliveryPreferences: "/spirit-food/delivery-preferences",
    getRecentMessages: "/spirit-food/recent-messages",

    /* ---- POST ---- */
    saveVerseById: (id: string) => `/spirit-food/${id}/save`,

    /* ---- PUT ---- */
    updateDeliveryPreferences: "/spirit-food/delivery-preferences",

    /* ---- DELETE ---- */
    removeSavedVerseById: (id: string) => `/spirit-food/${id}/save`,
  },
  config: {
    /* ---- GET ---- */
    getAvailableBibleVersions: "/admin/config/available-versions",
    getSmsTemplateAndVersions: "/admin/config/sms-template-and-versions",

    /* ---- POST ---- */
    previewTemplate: "/admin/config/preview-template",

    /* ---- PUT ---- */
    saveBibleVersions: "/admin/config/bible-versions",
    saveSmsTemplate: "/admin/config/sms-template",
  },
  mediaAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/media",
    getById: (id: string) => `/admin/media/${id}`,
    getStats: "/admin/media/stats/types",

    /* ---- POST ---- */
    create: "/admin/media",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/media/${id}`,

    /* ---- PATCH ---- */
    updateStatusById: (id: string) => `/admin/media/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/media/${id}`,
  },
  flashcardAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/flashcards",
    getById: (id: string) => `/admin/flashcards/${id}`,
    getStatsTotal: "/admin/flashcards/stats/total",
    getStatsStatus: "/admin/flashcards/stats/status",

    /* ---- POST ---- */
    create: "/admin/flashcards",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/flashcards/${id}`,

    /* ---- PATCH ---- */
    updateStatusById: (id: string) => `/admin/flashcards/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/flashcards/${id}`,
  },
  flashcardGroupAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/flashcard-groups",
    getById: (id: string) => `/admin/flashcard-groups/${id}`,
    getStatsTotal: "/admin/flashcard-groups/stats/total",
    getStatsStatus: "/admin/flashcard-groups/stats/status",

    /* ---- POST ---- */
    create: "/admin/flashcard-groups",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/flashcard-groups/${id}`,
    updateFlashcardsById: (id: string) => `/admin/flashcard-groups/${id}/flashcards`,

    /* ---- PATCH ---- */
    updateStatusById: (id: string) => `/admin/flashcard-groups/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/flashcard-groups/${id}`,
  },
  swordDrillUser: {
    /* ---- GET ---- */
    getSession: "/sword-drill/session",

    /* ---- POST ---- */
    submitAnswer: (sessionId: string) => `/sword-drill/session/${sessionId}/answer`,
    completeSession: (sessionId: string) => `/sword-drill/session/${sessionId}/complete`,
  },
  questsAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/quests",
    getById: (id: string) => `/admin/quests/${id}`,
    getStatsByStatus: "/admin/quests/stats/status",

    /* ---- POST ---- */
    create: "/admin/quests",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/quests/${id}`,

    /* ---- PATCH ---- */
    updateStatusById: (id: string) => `/admin/quests/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/quests/${id}`,

    /* ---- Stages ---- */
    stages: {
      getAll: (questId: string) => `/admin/quests/${questId}/stages`,
      getById: (questId: string, stageId: string) => `/admin/quests/${questId}/stages/${stageId}`,
      create: (questId: string) => `/admin/quests/${questId}/stages`,
      updateById: (questId: string, stageId: string) => `/admin/quests/${questId}/stages/${stageId}`,
      deleteById: (questId: string, stageId: string) => `/admin/quests/${questId}/stages/${stageId}`,
    },
  },
  badgesAdmin: {
    /* ---- GET ---- */
    getAll: "/badges",
    getStats: "/badges/stats/status",
    getById: (id: string) => `/badges/${id}`,

    /* ---- POST ---- */
    create: "/badges",

    /* ---- PUT ---- */
    updateById: (id: string) => `/badges/${id}`,

    /* ---- PATCH ---- */
    changeStatusById: (id: string) => `/badges/${id}/status`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/badges/${id}`,
  },
  userManagementAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/users",
    getStats: "/admin/users/stats",
    getProfile: (userId: string) => `/admin/users/${userId}/profile`,
    getActivity: (userId: string) => `/admin/users/${userId}/activity`,
    getSettings: (userId: string) => `/admin/users/${userId}/settings`,
    getSpiritFood: (userId: string) => `/admin/users/${userId}/spirit-food`,
    getBadges: (userId: string) => `/admin/users/${userId}/badges`,
    getFeedback: (userId: string) => `/admin/users/${userId}/feedback`,
    getSavedVerses: (userId: string) => `/admin/users/${userId}/saved-verses`,

    /* ---- PATCH ---- */
    suspend: (userId: string) => `/admin/users/${userId}/suspend`,
    activate: (userId: string) => `/admin/users/${userId}/activate`,

    /* ---- DELETE ---- */
    delete: (userId: string) => `/admin/users/${userId}`,
  },
  entitlementAdmin: {
    roles: {
      /* ---- GET ---- */
      getAll: "/entitlement/roles",
      getById: (id: string) => `/entitlement/roles/${id}`,

      /* ---- POST ---- */
      create: "/entitlement/roles",

      /* ---- PUT ---- */
      updateById: (id: string) => `/entitlement/roles/${id}`,

      /* ---- DELETE ---- */
      deleteById: (id: string) => `/entitlement/roles/${id}`,
    },
    resources: {
      getAll: "/entitlement/resources",
      getById: (id: string) => `/entitlement/resources/${id}`,
      create: "/entitlement/resources",
      updateById: (id: string) => `/entitlement/resources/${id}`,
      deleteById: (id: string) => `/entitlement/resources/${id}`,
    },
    actions: {
      getAll: "/entitlement/actions",
      getById: (id: string) => `/entitlement/actions/${id}`,
      create: "/entitlement/actions",
      updateById: (id: string) => `/entitlement/actions/${id}`,
      deleteById: (id: string) => `/entitlement/actions/${id}`,
    },
    permissions: {
      getAll: "/entitlement/permissions",
      getById: (id: string) => `/entitlement/permissions/${id}`,
      create: "/entitlement/permissions",
      updateById: (id: string) => `/entitlement/permissions/${id}`,
      deleteById: (id: string) => `/entitlement/permissions/${id}`,
    },
    userRoles: {
      getAll: "/entitlement/user-roles",
      create: "/entitlement/user-roles",
      delete: "/entitlement/user-roles",
    },
    checkPermission: "/entitlement/check-permission",
    userPermissions: "/entitlement/user-permissions",
    auditLogs: "/entitlement/audit-logs",
  },
  profileUser: {
    /* ---- GET ---- */
    get: "/profile",
    getBadges: "/profile/badges",
    getTotalPoints: "/profile/total-points",

    /* ---- PUT ---- */
    update: "/profile",
    updateAvatar: "/profile/avatar",

    /* ---- DELETE ---- */
    delete: "/profile",
  },
  settingsUser: {
    /* ---- GET ---- */
    get: "/settings",
    getAbout: "/settings/about",
    getTerms: "/settings/terms",
    getPrivacy: "/settings/privacy",

    /* ---- PUT ---- */
    update: "/settings",
  },
  feedbackUser: {
    /* ---- POST ---- */
    submit: "/feedback",
  },
  quizUser: {
    /* ---- GET ---- */
    list: "/user/quizzes",
    getById: (id: string) => `/user/quizzes/${id}`,
    getStatsMe: "/user/quizzes/stats/me",

    /* ---- POST ---- */
    create: "/user/quizzes",

    updateQuizById: (id: string) => `/user/quizzes/${id}`,
    complete: (id: string) => `/user/quizzes/${id}/complete`,
  },
  groupUser: {
    /* ---- GET ---- */
    getMyGroups: "/groups/my",
    getPublicGroups: "/groups/public",
    getGroup: (groupId: string) => `/groups/${groupId}`,
    getMyGroupInvitations: "/groups/invites/my",
    getInvitation: (invitationId: string) => `/groups/invites/${invitationId}`,
    usersForInvitation: (groupId: string) => `/groups/${groupId}/users-for-invitation`,
    announcements: (groupId: string) => `/groups/${groupId}/announcements`,
    announcement: (groupId: string, announcementId: string) => `/groups/${groupId}/announcements/${announcementId}`,
    members: (groupId: string) => `/groups/${groupId}/members`,
    leaderboard: (groupId: string) => `/groups/${groupId}/leaderboard`,
    assignments: (groupId: string) => `/groups/${groupId}/assignments`,
    allAssignments: (groupId: string) => `/groups/${groupId}/assignments/all`,
    assignmentProgress: (groupId: string, assignmentId: string) =>
      `/groups/${groupId}/assignments/${assignmentId}/progress`,

    /* ---- POST ---- */
    create: "/groups",
    joinGroup: (groupId: string) => `/groups/${groupId}/join`,
    leaveGroup: (groupId: string) => `/groups/${groupId}/leave`,
    createInvitation: (groupId: string) => `/groups/${groupId}/invites`,
    joinByInvitation: "/groups/invites/join",
    declineInvitation: "/groups/decline",
    cancelInvitation: (groupId: string, invitationId: string) => `/groups/${groupId}/invites/${invitationId}/cancel`,
    markInvitationSeen: (invitationId: string) => `/groups/invites/${invitationId}/mark-as-seen`,
    createAnnouncement: (groupId: string) => `/groups/${groupId}/announcements`,
    createAssignment: (groupId: string) => `/groups/${groupId}/assignments`,
    promoteMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/promote-co-leader`,
    demoteMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/demote-co-leader`,
    removeMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/remove`,
    assignLeader: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/assign-leader`,
    demoteLeader: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/demote-leader`,
    banMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}/ban`,

    /* ---- PUT ---- */
    updateGroup: (groupId: string) => `/groups/${groupId}`,

    /* ---- DELETE ---- */
    deleteGroup: (groupId: string) => `/groups/${groupId}`,
  },
  leaderboardUser: {
    /* ---- GET ---- */
    getGlobal: "/leaderboard/global",
    getFriends: "/leaderboard/friends",
    getGroups: "/leaderboard/groups",
    getGroupLeaderboard: (groupId: string) => `/leaderboard/groups/${groupId}`,
  },
  questUser: {
    /* ---- GET ---- */
    list: "/user/quests",
    getById: (id: string) => `/user/quests/${id}`,
    getStatsMe: "/user/quests/stats/me",
    getStageById: (questId: string, stageId: string) => `/user/quests/${questId}/stages/${stageId}`,
    getContentById: (questId: string, stageId: string, contentId: string) =>
      `/user/quests/${questId}/stages/${stageId}/content/${contentId}`,

    /* ---- POST ---- */
    create: "/user/quests",
    createStage: (questId: string) => `/user/quests/${questId}/stages`,
    submitContent: (questId: string, stageId: string) => `/user/quests/${questId}/stages/${stageId}/content/submit`,
    pauseStage: (questId: string, stageId: string) => `/user/quests/${questId}/stages/${stageId}/pause`,
    completeStage: (questId: string, stageId: string) => `/user/quests/${questId}/stages/${stageId}/complete`,
    completeQuest: (questId: string) => `/user/quests/${questId}/complete`,
  },
  friendsUser: {
    /* ---- GET ---- */
    getStats: "/user/friends/stats",
    getFriends: "/user/friends",
    getFriendRequests: "/user/friend-requests",
    searchFriends: "/user/friends/search",

    /* ---- POST ---- */
    sendFriendRequest: "/user/friend-requests",
    acceptFriendRequest: (requestId: string) => `/user/friend-requests/${requestId}/accept`,
    rejectFriendRequest: (requestId: string) => `/user/friend-requests/${requestId}/reject`,
    cancelFriendRequest: (requestId: string) => `/user/friend-requests/${requestId}/cancel`,

    /* ---- DELETE ---- */
    deleteFriend: (friendshipId: string) => `/user/friends/${friendshipId}`,
  },
  chatbotUser: {
    /* ---- GET ---- */
    bibleRag: "/search/bible/rag",
  },
  tagsAdmin: {
    /* ---- GET ---- */
    getAll: "/admin/tags",
    getById: (id: string) => `/admin/tags/${id}`,
    getStats: "/admin/tags/stats",
    export: (format: string = "csv") => `/admin/tags/export?format=${format}`,

    /* ---- POST ---- */
    create: "/admin/tags",

    /* ---- PUT ---- */
    updateById: (id: string) => `/admin/tags/${id}`,

    /* ---- DELETE ---- */
    deleteById: (id: string) => `/admin/tags/${id}`,

    /* ---- Categories ---- */
    categories: {
      getAll: "/admin/tags/categories",
      create: "/admin/tags/categories",
      updateById: (id: string) => `/admin/tags/categories/${id}`,
      deleteById: (id: string) => `/admin/tags/categories/${id}`,
    },
  },
};
