/**
 * TEAM SERVICE
 * Handles team member management, roles, permissions, and activity tracking
 * 
 * BACKEND HANDOFF: Replace mock implementations with real API calls
 * Expected endpoints:
 * - GET /api/team/members - List team members
 * - GET /api/team/members/:id - Get member details
 * - POST /api/team/members - Invite new member
 * - PUT /api/team/members/:id - Update member
 * - DELETE /api/team/members/:id - Remove member
 * - GET /api/team/roles - List available roles
 * - GET /api/team/activity - Get activity log
 * - GET /api/team/handover - Get handover notes
 * - POST /api/team/handover - Create handover note
 */

import teamData from '@/data/mock/team.json';

// Types
export type TeamRole = 'admin' | 'manager' | 'support' | 'viewer';
export type MemberStatus = 'active' | 'inactive' | 'pending';

export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TeamRole;
  title: string;
  avatar: string | null;
  timezone: string;
  countries: string[];
  permissions: string[];
  status: MemberStatus;
  lastActiveAt: string;
  createdAt: string;
  deactivatedAt?: string;
}

export interface RoleDefinition {
  id: TeamRole;
  name: string;
  description: string;
  permissions: string[];
  canAssign: boolean;
  memberCount: number;
}

export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
  country: string | null;
}

export interface HandoverNote {
  id: string;
  shiftDate: string;
  shiftType: 'morning' | 'afternoon' | 'evening' | 'night';
  region: string;
  createdBy: string;
  createdByName: string;
  notes: string;
  openIssues: number;
  resolvedIssues: number;
  timestamp: string;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getTeamMembers(includeInactive?: boolean): Promise<TeamMember[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let members = teamData.members as TeamMember[];
  
  if (!includeInactive) {
    members = members.filter(m => m.status === 'active');
  }
  
  return members;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getTeamMemberById(memberId: string): Promise<TeamMember | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const member = teamData.members.find(m => m.id === memberId) as TeamMember | undefined;
  return member || null;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getRoles(): Promise<RoleDefinition[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return teamData.roles as RoleDefinition[];
}

// BACKEND HANDOFF: Replace with actual API call
export async function getActivityLog(filters?: {
  userId?: string;
  action?: string;
  country?: string;
  limit?: number;
}): Promise<ActivityLogEntry[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let logs = teamData.activityLog as ActivityLogEntry[];
  
  if (filters?.userId) {
    logs = logs.filter(l => l.userId === filters.userId);
  }
  
  if (filters?.action) {
    logs = logs.filter(l => l.action === filters.action);
  }
  
  if (filters?.country) {
    logs = logs.filter(l => l.country === filters.country);
  }
  
  if (filters?.limit) {
    logs = logs.slice(0, filters.limit);
  }
  
  return logs;
}

// BACKEND HANDOFF: Replace with actual API call
export async function getHandoverNotes(limit?: number): Promise<HandoverNote[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const notes = teamData.handoverNotes as HandoverNote[];
  return limit ? notes.slice(0, limit) : notes;
}

// BACKEND HANDOFF: Replace with actual API call
export async function createHandoverNote(note: Omit<HandoverNote, 'id' | 'timestamp'>): Promise<HandoverNote> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    ...note,
    id: `hn_${Date.now()}`,
    timestamp: new Date().toISOString()
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function inviteTeamMember(data: {
  email: string;
  firstName: string;
  lastName: string;
  role: TeamRole;
  title: string;
  countries: string[];
}): Promise<TeamMember> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: `user_${Date.now()}`,
    ...data,
    avatar: null,
    timezone: 'Europe/Paris',
    permissions: [],
    status: 'pending',
    lastActiveAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
}

// BACKEND HANDOFF: Replace with actual API call
export async function updateTeamMember(
  memberId: string,
  updates: Partial<Pick<TeamMember, 'role' | 'title' | 'countries' | 'permissions'>>
): Promise<TeamMember> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const member = teamData.members.find(m => m.id === memberId) as TeamMember;
  if (!member) {
    throw new Error('Member not found');
  }
  
  return { ...member, ...updates };
}

// BACKEND HANDOFF: Replace with actual API call
export async function deactivateMember(memberId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock implementation - would update status and revoke access
}

// BACKEND HANDOFF: Replace with actual API call
export async function reactivateMember(memberId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock implementation - would update status and restore access
}

// Helper to format timezone for display
export function formatTimezone(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    return formatter.format(now);
  } catch {
    return timezone;
  }
}
