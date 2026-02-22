import type {
  AdminUserListInput,
  AdminUserFilterStore,
  AdminUserBadgesListInput,
  AdminUserBadgesFilterStore,
  AdminUserFeedbackListInput,
  AdminUserFeedbackFilterStore,
  AdminUserSavedVersesListInput,
  AdminUserSavedVersesFilterStore,
  AdminUserListItem,
  AdminUserStatsResponse,
  AdminUserProfile,
  AdminUserStats,
  AdminUserActivity,
  AdminUserSettings,
  AdminUserSpiritFood,
  AdminUserBadge,
  AdminUserFeedback,
  AdminUserSavedVerse,
} from "./admin-user-management.types";

/* ---- Default Values ---- */
export const defaultAdminUserListInput: AdminUserListInput = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserBadgesListInput: AdminUserBadgesListInput = {
  page: 1,
  pageSize: 20,
  sort: "-earnedAt",
};

export const defaultAdminUserFeedbackListInput: AdminUserFeedbackListInput = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserSavedVersesListInput: AdminUserSavedVersesListInput = {
  page: 1,
  pageSize: 20,
  sort: "-savedAt",
};

/* ---- Default Filter Values ---- */
export const defaultAdminUserManagementFilters: Pick<AdminUserFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserListInput, "page" | "pageSize" | "sort"> = {
  q: undefined,
  status: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserBadgesFilters: Pick<AdminUserBadgesFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserBadgesListInput, "page" | "pageSize" | "sort"> = {
  rarity: undefined,
  page: 1,
  pageSize: 20,
  sort: "-earnedAt",
};

export const defaultAdminUserFeedbackFilters: Pick<AdminUserFeedbackFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserFeedbackListInput, "page" | "pageSize" | "sort"> = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserSavedVersesFilters: Pick<AdminUserSavedVersesFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserSavedVersesListInput, "page" | "pageSize" | "sort"> = {
  page: 1,
  pageSize: 20,
  sort: "-savedAt",
};

/* ---- Centralized Mock User Data ---- */
type MockUserData = {
  profile: AdminUserProfile;
  stats: AdminUserStats;
  activity: AdminUserActivity;
  settings: AdminUserSettings;
  spiritFood: AdminUserSpiritFood;
  badges: AdminUserBadge[];
  feedback: AdminUserFeedback[];
  savedVerses: AdminUserSavedVerse[];
};

const MOCK_USER_DATA: Record<string, MockUserData> = {
  "user-uuid-1": {
    profile: {
      id: "user-uuid-1",
      username: "john_doe",
      name: "John Doe",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      status: "active",
      joinedAt: "2025-01-15T10:30:00.000Z",
      lastActive: "2025-01-20T14:22:31.000Z",
      location: "Dallas, TX",
    },
    stats: {
      totalXp: 4567,
      globalRank: 44,
      dayStreak: 15,
    },
    activity: {
      questsCompleted: 12,
      quizzesCompleted: 45,
      swordDrillPlayed: 23,
    },
    settings: {
      notifications: true,
      soundEffects: true,
    },
    spiritFood: {
      savedVerses: 15,
      deliveryTime: "08:00",
      deliveryPreferences: {
        smsNotifications: true,
        emailDevotion: true,
        pushNotifications: true,
      },
    },
    badges: [
      {
        id: "badge-uuid-1",
        name: "First Quest",
        description: "Completed your first quest",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-16T10:00:00.000Z",
      },
      {
        id: "badge-uuid-2",
        name: "Quiz Master",
        description: "Completed 10 quizzes",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-18T14:30:00.000Z",
      },
      {
        id: "badge-uuid-3",
        name: "Streak Champion",
        description: "Maintained a 7-day streak",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T08:00:00.000Z",
      },
      {
        id: "badge-uuid-4",
        name: "Bible Explorer",
        description: "Read 50 Bible chapters",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-17T11:00:00.000Z",
      },
      {
        id: "badge-uuid-5",
        name: "Sword Drill Expert",
        description: "Completed 25 sword drills",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T15:00:00.000Z",
      },
      {
        id: "badge-uuid-6",
        name: "Perfect Score",
        description: "Got 100% on 5 quizzes",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T16:30:00.000Z",
      },
      {
        id: "badge-uuid-7",
        name: "Daily Devotion",
        description: "Completed 30 days of spirit food",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-18T09:00:00.000Z",
      },
      {
        id: "badge-uuid-8",
        name: "Quest Completer",
        description: "Completed 5 quests",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-17T14:00:00.000Z",
      },
      {
        id: "badge-uuid-9",
        name: "Memory Master",
        description: "Memorized 20 verses",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-16T13:00:00.000Z",
      },
      {
        id: "badge-uuid-10",
        name: "Speed Demon",
        description: "Completed quiz in under 2 minutes",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T10:00:00.000Z",
      },
      {
        id: "badge-uuid-11",
        name: "Faithful Follower",
        description: "Logged in 50 days",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T08:00:00.000Z",
      },
      {
        id: "badge-uuid-12",
        name: "Chapter Champion",
        description: "Read 100 Bible chapters",
        rarity: "Legendary",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T12:00:00.000Z",
      },
      {
        id: "badge-uuid-13",
        name: "Quiz Warrior",
        description: "Completed 50 quizzes",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T13:00:00.000Z",
      },
      {
        id: "badge-uuid-14",
        name: "Verse Collector",
        description: "Saved 30 verses",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-18T10:00:00.000Z",
      },
      {
        id: "badge-uuid-15",
        name: "Sword Master",
        description: "Completed 50 sword drills",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T14:00:00.000Z",
      },
      {
        id: "badge-uuid-16",
        name: "Early Bird",
        description: "Completed spirit food before 7 AM",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T06:30:00.000Z",
      },
      {
        id: "badge-uuid-17",
        name: "Night Owl",
        description: "Completed activities after 10 PM",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-17T22:00:00.000Z",
      },
      {
        id: "badge-uuid-18",
        name: "Perfect Week",
        description: "Completed all daily activities for 7 days",
        rarity: "Legendary",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T09:00:00.000Z",
      },
      {
        id: "badge-uuid-19",
        name: "Quest Hero",
        description: "Completed 10 quests",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T11:00:00.000Z",
      },
      {
        id: "badge-uuid-20",
        name: "Bible Scholar",
        description: "Read all 66 books",
        rarity: "Legendary",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T15:00:00.000Z",
      },
      {
        id: "badge-uuid-21",
        name: "Quick Learner",
        description: "Completed 5 quizzes in one day",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-18T17:00:00.000Z",
      },
      {
        id: "badge-uuid-22",
        name: "Streak Keeper",
        description: "Maintained a 30-day streak",
        rarity: "Legendary",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T16:00:00.000Z",
      },
      {
        id: "badge-uuid-23",
        name: "First Steps",
        description: "Completed your first quiz",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-15T14:00:00.000Z",
      },
      {
        id: "badge-uuid-24",
        name: "Sword Fighter",
        description: "Completed your first sword drill",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-16T15:00:00.000Z",
      },
      {
        id: "badge-uuid-25",
        name: "Verse Memorizer",
        description: "Memorized 10 verses",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-17T16:00:00.000Z",
      },
      {
        id: "badge-uuid-26",
        name: "Dedicated Learner",
        description: "Spent 100 hours studying",
        rarity: "Epic",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-20T17:00:00.000Z",
      },
      {
        id: "badge-uuid-27",
        name: "Special Achievement",
        description: "Earned during special event",
        rarity: "Special",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-19T18:00:00.000Z",
      },
    ],
    feedback: [
      {
        id: "feedback-uuid-1",
        message: "Great app! Love the quest feature.",
        category: "general",
        status: "resolved",
        createdAt: "2025-01-17T10:00:00.000Z",
        updatedAt: "2025-01-18T14:00:00.000Z",
      },
      {
        id: "feedback-uuid-2",
        message: "Would like to see more quiz categories.",
        category: "feature_request",
        status: "open",
        createdAt: "2025-01-19T15:30:00.000Z",
        updatedAt: "2025-01-19T15:30:00.000Z",
      },
    ],
    savedVerses: [
      {
        id: "verse-uuid-1",
        verseReference: "John 3:16",
        verseText:
          "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        savedAt: "2025-01-16T10:00:00.000Z",
      },
      {
        id: "verse-uuid-2",
        verseReference: "Philippians 4:13",
        verseText: "I can do all this through him who gives me strength.",
        savedAt: "2025-01-17T14:30:00.000Z",
      },
      {
        id: "verse-uuid-3",
        verseReference: "Jeremiah 29:11",
        verseText:
          'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
        savedAt: "2025-01-18T09:15:00.000Z",
      },
    ],
  },
  "user-uuid-2": {
    profile: {
      id: "user-uuid-2",
      username: "jane_smith",
      name: "Jane Smith",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      status: "active",
      joinedAt: "2025-01-10T08:20:00.000Z",
      lastActive: "2025-01-20T12:10:00.000Z",
      location: "Austin, TX",
    },
    stats: {
      totalXp: 3200,
      globalRank: 89,
      dayStreak: 8,
    },
    activity: {
      questsCompleted: 8,
      quizzesCompleted: 32,
      swordDrillPlayed: 18,
    },
    settings: {
      notifications: false,
      soundEffects: true,
    },
    spiritFood: {
      savedVerses: 8,
      deliveryTime: "07:30",
      deliveryPreferences: {
        smsNotifications: false,
        emailDevotion: true,
        pushNotifications: true,
      },
    },
    badges: [
      {
        id: "badge-uuid-4",
        name: "First Quest",
        description: "Completed your first quest",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-11T09:00:00.000Z",
      },
    ],
    feedback: [
      {
        id: "feedback-uuid-3",
        message: "Having issues with notifications.",
        category: "bug_report",
        status: "in_progress",
        createdAt: "2025-01-15T11:20:00.000Z",
        updatedAt: "2025-01-16T09:00:00.000Z",
      },
    ],
    savedVerses: [
      {
        id: "verse-uuid-4",
        verseReference: "Proverbs 3:5-6",
        verseText:
          "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        savedAt: "2025-01-12T11:00:00.000Z",
      },
    ],
  },
  "user-uuid-3": {
    profile: {
      id: "user-uuid-3",
      username: "bob_wilson",
      name: "Bob Wilson",
      avatarUrl: null,
      status: "suspended",
      joinedAt: "2024-12-20T14:15:00.000Z",
      lastActive: "2025-01-18T10:00:00.000Z",
      location: "Houston, TX",
    },
    stats: {
      totalXp: 1200,
      globalRank: 250,
      dayStreak: 0,
    },
    activity: {
      questsCompleted: 3,
      quizzesCompleted: 15,
      swordDrillPlayed: 5,
    },
    settings: {
      notifications: true,
      soundEffects: false,
    },
    spiritFood: {
      savedVerses: 3,
      deliveryTime: "09:00",
      deliveryPreferences: {
        smsNotifications: true,
        emailDevotion: false,
        pushNotifications: false,
      },
    },
    badges: [],
    feedback: [],
    savedVerses: [],
  },
  "user-uuid-4": {
    profile: {
      id: "user-uuid-4",
      username: "alice_brown",
      name: "Alice Brown",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      status: "active",
      joinedAt: "2025-01-05T09:45:00.000Z",
      lastActive: "2025-01-19T16:30:00.000Z",
      location: "San Antonio, TX",
    },
    stats: {
      totalXp: 2800,
      globalRank: 120,
      dayStreak: 5,
    },
    activity: {
      questsCompleted: 6,
      quizzesCompleted: 28,
      swordDrillPlayed: 12,
    },
    settings: {
      notifications: true,
      soundEffects: true,
    },
    spiritFood: {
      savedVerses: 10,
      deliveryTime: "08:30",
      deliveryPreferences: {
        smsNotifications: true,
        emailDevotion: true,
        pushNotifications: false,
      },
    },
    badges: [
      {
        id: "badge-uuid-5",
        name: "First Quest",
        description: "Completed your first quest",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-06T10:00:00.000Z",
      },
    ],
    feedback: [],
    savedVerses: [
      {
        id: "verse-uuid-5",
        verseReference: "Romans 8:28",
        verseText:
          "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        savedAt: "2025-01-10T14:00:00.000Z",
      },
    ],
  },
  "user-uuid-5": {
    profile: {
      id: "user-uuid-5",
      username: "charlie_davis",
      name: "Charlie Davis",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      status: "active",
      joinedAt: "2024-11-30T16:00:00.000Z",
      lastActive: "2025-01-21T09:15:00.000Z",
      location: null,
    },
    stats: {
      totalXp: 8900,
      globalRank: 12,
      dayStreak: 52,
    },
    activity: {
      questsCompleted: 25,
      quizzesCompleted: 120,
      swordDrillPlayed: 67,
    },
    settings: {
      notifications: true,
      soundEffects: true,
    },
    spiritFood: {
      savedVerses: 42,
      deliveryTime: "06:00",
      deliveryPreferences: {
        smsNotifications: true,
        emailDevotion: true,
        pushNotifications: true,
      },
    },
    badges: [
      {
        id: "badge-uuid-6",
        name: "First Quest",
        description: "Completed your first quest",
        rarity: "Common",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2024-12-01T10:00:00.000Z",
      },
      {
        id: "badge-uuid-7",
        name: "Quiz Master",
        description: "Completed 10 quizzes",
        rarity: "Rare",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2024-12-15T14:30:00.000Z",
      },
      {
        id: "badge-uuid-8",
        name: "Legendary Player",
        description: "Reached top 20 global rank",
        rarity: "Legendary",
        iconUrl: "https://via.placeholder.com/64",
        earnedAt: "2025-01-10T08:00:00.000Z",
      },
    ],
    feedback: [
      {
        id: "feedback-uuid-4",
        message: "Amazing experience! Keep up the great work.",
        category: "general",
        status: "resolved",
        createdAt: "2024-12-20T10:00:00.000Z",
        updatedAt: "2024-12-21T14:00:00.000Z",
      },
    ],
    savedVerses: [
      {
        id: "verse-uuid-6",
        verseReference: "Isaiah 40:31",
        verseText:
          "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        savedAt: "2024-12-05T10:00:00.000Z",
      },
      {
        id: "verse-uuid-7",
        verseReference: "Joshua 1:9",
        verseText:
          "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
        savedAt: "2024-12-10T14:30:00.000Z",
      },
    ],
  },
};

/* ---- Derived Mock Data (from centralized source) ---- */
export const MOCK_USERS: AdminUserListItem[] = Object.values(MOCK_USER_DATA).map((userData) => ({
  id: userData.profile.id,
  username: userData.profile.username,
  name: userData.profile.name,
  avatarUrl: userData.profile.avatarUrl,
  status: userData.profile.status,
  joinedAt: userData.profile.joinedAt,
  location: userData.profile.location,
  email: userData.profile.email,
}));

export const MOCK_STATS: AdminUserStatsResponse = {
  totalUsers: MOCK_USERS.length,
  activeUsers: MOCK_USERS.filter((u) => u.status === "active").length,
  suspendedUsers: MOCK_USERS.filter((u) => u.status === "suspended").length,
};

export const MOCK_USER_PROFILES: Record<string, { profile: AdminUserProfile; stats: AdminUserStats }> =
  Object.fromEntries(
    Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [
      userId,
      {
        profile: userData.profile,
        stats: userData.stats,
      },
    ])
  );

export const MOCK_USER_ACTIVITIES: Record<string, AdminUserActivity> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.activity])
);

export const MOCK_USER_SETTINGS: Record<string, AdminUserSettings> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.settings])
);

export const MOCK_USER_SPIRIT_FOOD: Record<string, AdminUserSpiritFood> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.spiritFood])
);

export const MOCK_USER_BADGES: Record<string, AdminUserBadge[]> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.badges])
);

export const MOCK_USER_FEEDBACK: Record<string, AdminUserFeedback[]> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.feedback])
);

export const MOCK_USER_SAVED_VERSES: Record<string, AdminUserSavedVerse[]> = Object.fromEntries(
  Object.entries(MOCK_USER_DATA).map(([userId, userData]) => [userId, userData.savedVerses])
);
