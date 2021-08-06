function hasPermission(currentUserId: number, currentUserRole: string, ownerId: number): boolean {
  return currentUserRole === 'ADMIN' || currentUserId === ownerId;
}

export default hasPermission;
