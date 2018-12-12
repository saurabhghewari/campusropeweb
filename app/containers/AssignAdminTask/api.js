import { adminTasksService } from '../../feathers';

export function getAdminTasksForUser(userId) {
  if (userId) {
    return adminTasksService
      .find({
        query: {
          userId: userId,
        },
      })
      .then(res => res.data.tasks); // this is called on auto complete . the above if condition is to avoid unwanted network requests
  }
  return [];
}

export function saveAdminTasksApi({ tasks, selectedUser }) {
  return adminTasksService.patch();
}
