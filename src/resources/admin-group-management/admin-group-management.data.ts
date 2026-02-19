import type {
  AdminGroupStats,
  AdminGroupListItem,
  AdminGroupDetail,
  AdminGroupReport,
  AdminGroupAnnouncement,
  AdminGroupActivityLogEntry,
  AdminGroupMember,
  AdminGroupAssignment,
  AdminGroupLeaderboardEntry,
} from "./admin-group-management.types";

export const MOCK_GROUP_STATS: AdminGroupStats = {
  totalGroups: 8,
  activeGroups: 6,
  suspendedGroups: 1,
  totalMembers: 335,
  avgActivityScore: 65,
  flaggedGroups: 2,
};

export const MOCK_GROUPS: AdminGroupListItem[] = [
  {
    id: "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10",
    name: "Young Adults Study",
    description: "Weekly study for ages 18-30.",
    iconPath: "group-bible-study",
    type: "bible_study",
    privacy: "public",
    status: "active",
    memberCount: 24,
    activityScore: 95,
    totalQuizzes: 1250,
    totalQuests: 89,
    lastActivityAt: "2025-01-20T14:22:31.000Z",
    createdAt: "2025-01-15T10:30:00.000Z",
    leader: {
      id: "8a7d2c7d-2345-5e4c-af3g-26d6d0b90b21",
      name: "Sarah Johnson",
      username: "sarah_johnson",
    },
    reportsCount: 2,
  },
  {
    id: "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32",
    name: "Prayer Warriors",
    description: "Daily prayer and intercession group.",
    iconPath: "group-prayer",
    type: "prayer_group",
    privacy: "public",
    status: "active",
    memberCount: 156,
    activityScore: 88,
    totalQuizzes: 450,
    totalQuests: 23,
    lastActivityAt: "2025-01-21T08:15:00.000Z",
    createdAt: "2024-11-10T09:00:00.000Z",
    leader: {
      id: "9b8e3d8e-3456-6f5d-ch5i-48f8f2d12d43",
      name: "Michael Chen",
      username: "michael_chen",
    },
    reportsCount: 1,
  },
  {
    id: "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54",
    name: "Youth Ministry",
    description: "Engaging teens with faith and fun.",
    iconPath: "group-youth",
    type: "other",
    privacy: "public",
    status: "active",
    memberCount: 87,
    activityScore: 72,
    totalQuizzes: 890,
    totalQuests: 156,
    lastActivityAt: "2025-01-19T16:45:00.000Z",
    createdAt: "2024-09-05T14:20:00.000Z",
    leader: {
      id: "ac9f4e9f-4567-7g6e-dj7k-50h0h4f34f65",
      name: "Jessica Martinez",
      username: "jess_martinez",
    },
    reportsCount: 1,
  },
  {
    id: "ai9j4e9g-4567-7h6f-ek8l-61i1i5g45g76",
    name: "Couples Connect",
    description: "Marriage enrichment and support.",
    iconPath: "group-family",
    type: "family",
    privacy: "private",
    status: "active",
    memberCount: 32,
    activityScore: 91,
    totalQuizzes: 320,
    totalQuests: 45,
    lastActivityAt: "2025-01-20T19:30:00.000Z",
    createdAt: "2024-12-01T11:00:00.000Z",
    leader: {
      id: "bd0g5f0g-5678-8h7f-fl9m-72j2j6h56h87",
      name: "David & Rachel Kim",
      username: "kim_couple",
    },
    reportsCount: 0,
  },
  {
    id: "bj0k5f0h-5678-8i7g-gm0n-83k3k7i67i98",
    name: "Mens Accountability",
    description: "Brotherhood and spiritual growth.",
    iconPath: "group-men",
    type: "other",
    privacy: "private",
    status: "active",
    memberCount: 12,
    activityScore: 85,
    totalQuizzes: 180,
    totalQuests: 67,
    lastActivityAt: "2025-01-18T20:00:00.000Z",
    createdAt: "2024-10-15T07:30:00.000Z",
    leader: {
      id: "ce1h6g1h-6789-9i8g-hn1o-94l4l8j78j09",
      name: "Robert Thompson",
      username: "rob_thompson",
    },
    reportsCount: 0,
  },
  {
    id: "ck1l6g1i-6789-9j8h-io2p-a5m5m9k89k10",
    name: "Womens Bible Study",
    description: "Deep dive into Scripture together.",
    iconPath: "group-women",
    type: "bible_study",
    privacy: "public",
    status: "active",
    memberCount: 45,
    activityScore: 93,
    totalQuizzes: 670,
    totalQuests: 112,
    lastActivityAt: "2025-01-21T10:15:00.000Z",
    createdAt: "2024-08-20T13:45:00.000Z",
    leader: {
      id: "df2i7h2i-7890-0j9h-jp3q-b6n6n0l90l21",
      name: "Amanda Williams",
      username: "amanda_w",
    },
    reportsCount: 0,
  },
  {
    id: "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32",
    name: "Suspended Test Group",
    description: "This group violated community guidelines.",
    iconPath: "group-bible-study",
    type: "bible_study",
    privacy: "public",
    status: "suspended",
    memberCount: 8,
    activityScore: 15,
    totalQuizzes: 45,
    totalQuests: 3,
    lastActivityAt: "2024-12-10T09:00:00.000Z",
    createdAt: "2024-11-01T16:00:00.000Z",
    leader: {
      id: "eg3j8i3j-8901-1l0j-lr5s-d8p8p2n12n43",
      name: "Test Leader",
      username: "test_leader",
    },
    reportsCount: 1,
  },
  {
    id: "em3n8i3k-8901-1m0k-ms6t-e9q9q3o23o54",
    name: "New Believers",
    description: "Foundations of faith for new Christians.",
    iconPath: "group-discipleship",
    type: "other",
    privacy: "public",
    status: "active",
    memberCount: 67,
    activityScore: 78,
    totalQuizzes: 890,
    totalQuests: 234,
    lastActivityAt: "2025-01-20T15:30:00.000Z",
    createdAt: "2024-07-12T10:00:00.000Z",
    leader: {
      id: "fh4k9j4k-9012-2n1l-nt7u-f0r0r4p34p65",
      name: "Pastor James Lee",
      username: "pastor_james",
    },
    reportsCount: 0,
  },
];

export const MOCK_GROUP_DETAILS: Record<string, AdminGroupDetail> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": {
    id: "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10",
    name: "Young Adults Study",
    iconPath: "/images/groups/bible-study-icon.png",
    memberCount: 24,
    activityScore: 95,
    createdAt: "2025-01-15T10:30:00.000Z",
    type: "bible_study",
    privacy: "public",
    status: "active",
    totalQuizzes: 1250,
    totalQuests: 89,
    reportsCount: 2,
    flaggedAnnouncementsCount: 1,
  },
};

export const MOCK_GROUP_REPORTS: Record<string, AdminGroupReport[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    {
      id: "1a2b3c4d-5678-9e0f-1a2b-3c4d5e6f7g8h",
      title: "Inappropriate Announcement",
      description: "Leader posted promotional content for a product in the announcement section.",

      status: "pending",
      reportedBy: {
        id: "2b3c4d5e-6789-0f1a-2b3c-4d5e6f7g8h9i",
        name: "John Doe",
        username: "john_doe",
      },
      reportedAt: "2024-12-15T10:30:00.000Z",
      groupId: "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10",
    },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    {
      id: "r2",
      title: "Spamming members",
      description: "The group leader is sending unsolicited private messages to all members.",

      status: "pending",
      reportedBy: { id: "u1", name: "James Wilson", username: "james_w" },
      reportedAt: "2025-01-20T14:00:00.000Z",
      groupId: "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32",
    },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    {
      id: "r3",
      title: "Off-topic content",
      description: "A member is posting political content in the youth Bible study group.",

      status: "pending",
      reportedBy: { id: "u2", name: "Sarah Parker", username: "sarah_p" },
      reportedAt: "2025-01-21T09:00:00.000Z",
      groupId: "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54",
    },
  ],
  "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32": [
    {
      id: "r4",
      title: "Serious misconduct",
      description: "Multiple reports of harassment within the group chat.",

      status: "pending",
      reportedBy: { id: "u3", name: "Robert Thompson", username: "rob_thompson" },
      reportedAt: "2025-01-22T11:30:00.000Z",
      groupId: "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32",
    },
  ],
};

export const MOCK_GROUP_ANNOUNCEMENTS: Record<string, AdminGroupAnnouncement[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    {
      id: "a1",
      content: "Welcome everyone! This week we're studying Romans 8. Please complete the assigned quiz before Friday.",
      views: 24,
      postedBy: { id: "leader1", name: "Sarah Johnson", username: "sarah_johnson" },
      postedAt: "2025-12-16T10:30:00.000Z",
      isFlagged: false,
    },
    {
      id: "a1-flagged",
      content: "Check out this amazing Bible study app - use my referral code for 20% off! Link: example.com/promo",
      views: 18,
      postedBy: { id: "leader1", name: "Sarah Johnson", username: "sarah_johnson" },
      postedAt: "2025-12-15T14:00:00.000Z",
      isFlagged: true,
    },
    {
      id: "a1-old",
      content: "Reminder: Our group meeting is this Wednesday at 7 PM. We'll be discussing last week's quest.",
      views: 22,
      postedBy: { id: "leader1", name: "Sarah Johnson", username: "sarah_johnson" },
      postedAt: "2025-12-12T09:00:00.000Z",
      isFlagged: false,
    },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    {
      id: "a2",
      content: "Welcome everyone! This week we're studying Romans 8. Please complete the assigned quiz before Friday.",
      views: 24,
      postedBy: { id: "leader2", name: "Michael Chen", username: "michael_chen" },
      postedAt: "2025-12-16T10:30:00.000Z",
      isFlagged: false,
    },
    {
      id: "a2-flagged",
      content: "Check out this amazing Bible study app - use my referral code for 20% off! Link: example.com/promo",
      views: 18,
      postedBy: { id: "leader2", name: "Michael Chen", username: "michael_chen" },
      postedAt: "2025-12-15T14:00:00.000Z",
      isFlagged: true,
    },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    {
      id: "a3",
      content: "Youth camp registration is now open!",
      views: 87,
      postedBy: { id: "leader3", name: "Jessica Martinez", username: "jess_martinez" },
      postedAt: "2025-01-19T14:00:00.000Z",
      isFlagged: false,
    },
  ],
};

export const MOCK_GROUP_ACTIVITY_LOGS: Record<string, AdminGroupActivityLogEntry[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    {
      type: "member",
      timestamp: "2025-12-10T10:00:00.000Z",
      actor: {
        name: "System",
        username: "system",
        role: "admin",
      },
      metadata: {
        title: "Group Created",
        description: 'The "Young Adults Study" group has been successfully created',
      },
    },
    {
      type: "member",
      timestamp: "2025-12-16T14:30:00.000Z",
      actor: {
        name: "Emily Davis",
        username: "emily_davis",
        role: "member",
      },
      metadata: {
        title: "Member Joined",
        description: "Accepted group invitation",
      },
    },
    {
      type: "assignment",
      timestamp: "2025-12-16T10:15:00.000Z",
      actor: {
        name: "Sarah Johnson",
        username: "sarah_johnson",
        role: "leader",
      },
      metadata: {
        title: "Quiz Assigned",
        description: 'Assigned "Romans 8 Quiz" to all members',
      },
    },
    {
      type: "announcement",
      timestamp: "2025-12-16T10:15:00.000Z",
      actor: {
        name: "Sarah Johnson",
        username: "sarah_johnson",
        role: "leader",
      },
      metadata: {
        title: "Announcement Posted",
        description: "Posted announcement about weekly study session",
      },
    },
    {
      type: "member",
      timestamp: "2025-12-16T10:15:00.000Z",
      actor: {
        name: "BibleMaster22",
        username: "biblemaster22",
        role: "member",
      },
      metadata: {
        title: "Member Completed Quiz",
        description: 'Completed "Gospel Foundation Quiz" with 95% score',
      },
    },
    {
      type: "report",
      timestamp: "2025-12-16T15:00:00.000Z",
      actor: {
        name: "Admin (Jason)",
        username: "jason_admin",
        role: "admin",
      },
      metadata: {
        title: "Admin Warning Issued",
        description: "Leader warned about promotional content policy",
      },
    },
    {
      type: "member",
      timestamp: "2025-12-15T21:30:00.000Z",
      actor: {
        name: "Sarah Johnson",
        username: "sarah_johnson",
        role: "leader",
      },
      metadata: {
        title: "Member Removed",
        description: 'Removed inactive member "InactiveUser123"',
      },
    },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    {
      type: "announcement",
      timestamp: "2025-01-21T08:15:00.000Z",
      actor: {
        name: "Michael Chen",
        username: "michael_chen",
        role: "leader",
      },
      metadata: {
        title: "Prayer Chain Started",
        description: "New prayer request for community wellness",
      },
    },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    {
      type: "assignment",
      timestamp: "2025-01-19T14:00:00.000Z",
      actor: {
        name: "Jessica Martinez",
        username: "jess_martinez",
        role: "leader",
      },
      metadata: {
        title: "Youth Quest Launched",
        description: 'Started "Summer Prep Quest"',
      },
    },
  ],
};

export const MOCK_GROUP_MEMBERS: Record<string, AdminGroupMember[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    {
      id: "8a7d2c7d-2345-5e4c-af3g-26d6d0b90b21",
      name: "Sarah Johnson",
      username: "sarah_johnson",
      role: "leader",
      status: "active",
      joinedAt: "2025-01-15T10:30:00.000Z",
    },
    {
      id: "2b3c4d5e-6789-0f1a-2b3c-4d5e6f7g8h9i",
      name: "John Doe",
      username: "john_doe",
      role: "co_leader",
      status: "active",
      joinedAt: "2025-01-16T11:00:00.000Z",
      myBibleIQ: 450,
      assignmentsCompleted: 12,
    },
    {
      id: "u11",
      name: "Sarah Parker",
      username: "sarah_p",
      role: "member",
      status: "active",
      joinedAt: "2025-01-17T09:30:00.000Z",
      myBibleIQ: 280,
      assignmentsCompleted: 5,
    },
    {
      id: "u12",
      name: "David Brown",
      username: "david_b",
      role: "member",
      status: "inactive",
      joinedAt: "2025-01-18T14:20:00.000Z",
      myBibleIQ: 150,
      assignmentsCompleted: 2,
    },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    {
      id: "9b8e3d8e-3456-6f5d-ch5i-48f8f2d12d43",
      name: "Michael Chen",
      username: "michael_chen",
      role: "leader",
      status: "active",
      joinedAt: "2024-11-10T09:00:00.000Z",
    },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    {
      id: "ac9f4e9f-4567-7g6e-dj7k-50h0h4f34f65",
      name: "Jessica Martinez",
      username: "jess_martinez",
      role: "leader",
      status: "active",
      joinedAt: "2024-09-05T14:20:00.000Z",
    },
  ],
  "ai9j4e9g-4567-7h6f-ek8l-61i1i5g45g76": [
    {
      id: "bd0g5f0g-5678-8h7f-fl9m-72j2j6h56h87",
      name: "David & Rachel Kim",
      username: "kim_couple",
      role: "leader",
      status: "active",
      joinedAt: "2024-12-01T11:00:00.000Z",
    },
  ],
  "bj0k5f0h-5678-8i7g-gm0n-83k3k7i67i98": [
    {
      id: "ce1h6g1h-6789-9i8g-hn1o-94l4l8j78j09",
      name: "Robert Thompson",
      username: "rob_thompson",
      role: "leader",
      status: "active",
      joinedAt: "2024-10-15T07:30:00.000Z",
    },
  ],
  "ck1l6g1i-6789-9j8h-io2p-a5m5m9k89k10": [
    {
      id: "df2i7h2i-7890-0j9h-jp3q-b6n6n0l90l21",
      name: "Amanda Williams",
      username: "amanda_w",
      role: "leader",
      status: "active",
      joinedAt: "2024-08-20T13:45:00.000Z",
    },
  ],
  "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32": [
    {
      id: "eg3j8i3j-8901-1l0j-lr5s-d8p8p2n12n43",
      name: "Test Leader",
      username: "test_leader",
      role: "leader",
      status: "active",
      joinedAt: "2024-11-01T16:00:00.000Z",
    },
  ],
  "em3n8i3k-8901-1m0k-ms6t-e9q9q3o23o54": [
    {
      id: "fh4k9j4k-9012-2n1l-nt7u-f0r0r4p34p65",
      name: "Pastor James Lee",
      username: "pastor_james",
      role: "leader",
      status: "active",
      joinedAt: "2024-07-12T10:00:00.000Z",
    },
  ],
};

export const MOCK_GROUP_ASSIGNMENTS: Record<string, AdminGroupAssignment[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    {
      id: "3c4d5e6f-7890-1a2b-3c4d-5e6f7g8h9i01",
      title: "Roman 8 Quiz",
      type: "Quiz",
      status: "not_started",
      dueDate: "2025-11-15T23:59:59.000Z",
      progress: { completed: 0, total: 24, percentage: 0 },
      avgScore: null,
      createdAt: "2025-01-10T08:00:00.000Z",
    },
    {
      id: "3c4d5e6f-7890-1a2b-3c4d-5e6f7g8h9i02",
      title: "Roman 8 Quiz",
      type: "Quest",
      status: "in_progress",
      dueDate: "2025-11-15T23:59:59.000Z",
      progress: { completed: 12, total: 24, percentage: 50 },
      avgScore: null,
      createdAt: "2025-01-10T08:00:00.000Z",
    },
    {
      id: "3c4d5e6f-7890-1a2b-3c4d-5e6f7g8h9i03",
      title: "Gospel Foundation Quiz",
      type: "Quiz",
      status: "completed",
      dueDate: "2025-11-15T23:59:59.000Z",
      progress: { completed: 24, total: 24, percentage: 100 },
      avgScore: 95,
      createdAt: "2025-01-10T08:00:00.000Z",
    },
    {
      id: "3c4d5e6f-7890-1a2b-3c4d-5e6f7g8h9i04",
      title: "Romans Road - Milestone 1",
      type: "Quest",
      status: "completed",
      dueDate: "2025-11-15T23:59:59.000Z",
      progress: { completed: 24, total: 24, percentage: 100 },
      avgScore: 100,
      createdAt: "2025-01-10T08:00:00.000Z",
    },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    {
      id: "4d5e6f7g-8901-2b3c-4d5e-6f7g8h9i0j1k",
      title: "Monthly Prayer Quiz",
      type: "Quiz",
      status: "in_progress",
      dueDate: "2025-01-30T23:59:59.000Z",
      progress: { completed: 85, total: 156, percentage: 54 },
      avgScore: null,
      createdAt: "2025-01-01T08:00:00.000Z",
    },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    {
      id: "5f6g7h8i-9012-3c4d-5e6f-7g8h9i0j1k2l",
      title: "Youth Camp Prep Quiz",
      type: "Quiz",
      status: "not_started",
      dueDate: "2025-02-15T23:59:59.000Z",
      progress: { completed: 0, total: 87, percentage: 0 },
      avgScore: null,
      createdAt: "2025-01-20T10:00:00.000Z",
    },
  ],
  "ai9j4e9g-4567-7h6f-ek8l-61i1i5g45g76": [
    {
      id: "6g7h8i9j-0123-4d5e-6f7g-8h9i0j1k2l3m",
      title: "Marriage Foundations Quiz",
      type: "Quiz",
      status: "completed",
      dueDate: "2024-12-25T23:59:59.000Z",
      progress: { completed: 32, total: 32, percentage: 100 },
      avgScore: 88,
      createdAt: "2024-12-01T08:00:00.000Z",
    },
  ],
  "bj0k5f0h-5678-8i7g-gm0n-83k3k7i67i98": [
    {
      id: "7h8i9j0k-1234-5e6f-7g8h-9i0j1k2l3m4n",
      title: "Brotherhood Challenge",
      type: "Quest",
      status: "in_progress",
      dueDate: "2025-01-25T23:59:59.000Z",
      progress: { completed: 6, total: 12, percentage: 50 },
      avgScore: null,
      createdAt: "2025-01-10T12:00:00.000Z",
    },
  ],
  "ck1l6g1i-6789-9j8h-io2p-a5m5m9k89k10": [
    {
      id: "8i9j0k1l-2345-6f7g-8h9i-0j1k2l3m4n5o",
      title: "Esther Bible Study Quiz",
      type: "Quiz",
      status: "completed",
      dueDate: "2024-11-20T23:59:59.000Z",
      progress: { completed: 45, total: 45, percentage: 100 },
      avgScore: 92,
      createdAt: "2024-11-01T09:00:00.000Z",
    },
  ],
  "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32": [
    {
      id: "9j0k1l2m-3456-7g8h-9i0j-1k2l3m4n5o6p",
      title: "Suspended Account Recovery Quiz",
      type: "Quiz",
      status: "not_started",
      dueDate: "2025-01-01T23:59:59.000Z",
      progress: { completed: 0, total: 8, percentage: 0 },
      avgScore: null,
      createdAt: "2024-12-01T10:00:00.000Z",
    },
  ],
  "em3n8i3k-8901-1m0k-ms6t-e9q9q3o23o54": [
    {
      id: "0k1l2m3n-4567-8h9i-0j1k-2l3m4n5o6p7q",
      title: "Faith Foundations Milestone 1",
      type: "Quest",
      status: "in_progress",
      dueDate: "2025-02-28T23:59:59.000Z",
      progress: { completed: 34, total: 67, percentage: 51 },
      avgScore: null,
      createdAt: "2025-01-15T14:00:00.000Z",
    },
  ],
};

export const MOCK_GROUP_LEADERBOARD: Record<string, AdminGroupLeaderboardEntry[]> = {
  "7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10": [
    { rank: 1, userId: "u1", name: "John Doe", username: "BibleMaster22", role: "member", score: 5670 },
    { rank: 2, userId: "u2", name: "Jane Smith", username: "JaneS", role: "member", score: 5120 },
    { rank: 3, userId: "u10", name: "James Wilson", username: "james_w", role: "member", score: 4890 },
    { rank: 4, userId: "u11", name: "Sarah Parker", username: "sarah_p", role: "co_leader", score: 4500 },
    { rank: 5, userId: "u12", name: "David Brown", username: "david_b", role: "member", score: 4200 },
  ],
  "8g7h2c7e-2345-5f4d-bg4h-37e7e1c01c32": [
    { rank: 1, userId: "u3", name: "Michael Chen", username: "michael_chen", role: "leader", score: 8900 },
  ],
  "9h8i3d8f-3456-6g5e-ci6j-49g9g3e23e54": [
    { rank: 1, userId: "u4", name: "Jessica Martinez", username: "jess_martinez", role: "leader", score: 4500 },
  ],
  "ai9j4e9g-4567-7h6f-ek8l-61i1i5g45g76": [
    { rank: 1, userId: "u5", name: "David Kim", username: "david_kim", role: "leader", score: 7200 },
  ],
  "bj0k5f0h-5678-8i7g-gm0n-83k3k7i67i98": [
    { rank: 1, userId: "u6", name: "Robert Thompson", username: "rob_thompson", role: "leader", score: 6100 },
  ],
  "ck1l6g1i-6789-9j8h-io2p-a5m5m9k89k10": [
    { rank: 1, userId: "u7", name: "Amanda Williams", username: "amanda_w", role: "leader", score: 9800 },
  ],
  "dl2m7h2j-7890-0k9i-kq4r-c7o7o1m01m32": [
    { rank: 1, userId: "u8", name: "Test Leader", username: "test_leader", role: "leader", score: 1200 },
  ],
  "em3n8i3k-8901-1m0k-ms6t-e9q9q3o23o54": [
    { rank: 1, userId: "u9", name: "Pastor James Lee", username: "pastor_james", role: "leader", score: 5400 },
  ],
};

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
