import { IOrderConfirmation, ITaskModel, ITaskUsage } from 'models';
import { ApiServiceFactory } from 'factories';

class TaskService extends ApiServiceFactory {
  private readonly controllerName = 'tasks';

  async getTasks(): Promise<ITaskModel[]> {
    const { data } = await this.api.get<ITaskModel[]>(this.controllerName);

    return data;
  }

  async getTasksForUser(userId: string): Promise<ITaskModel[]> {
    const { data } = await this.api.get<ITaskModel[]>(`${this.controllerName}/user/${userId}`);

    return data;
  }

  async addTask(task: ITaskModel): Promise<ITaskModel> {
    const { data } = await this.api.post<ITaskModel>(this.controllerName, task);

    return data;
  }

  async getTaskByID(id: string): Promise<ITaskModel> {
    const { data } = await this.api.get<ITaskModel>(`${this.controllerName}/${id}`);

    return data;
  }

  async updateTaskByID(id: string, task: ITaskModel): Promise<boolean> {
    const { status } = await this.api.patch<ITaskModel>(`${this.controllerName}/${id}`, task);

    return status === 200;
  }

  async updateRunning(id: string, isRunning: boolean): Promise<boolean> {
    const { status } = await this.api.patch<ITaskModel>(`${this.controllerName}/${id}`, { isRunning });

    return status === 200;
  }

  async deleteTask(id: string): Promise<boolean> {
    const { status } = await this.api.delete(`${this.controllerName}/${id}`);

    return status === 200;
  }

  async startTaskWithCvv(id: string, cvv: string): Promise<boolean> {
    const { status } = await this.api.post(`${this.controllerName}/start/${id}`, { cvv });

    return status === 200;
  }

  async getTaskUsage(id: string): Promise<ITaskUsage> {
    const { data } = await this.api.get(`${this.controllerName}/usage-data-for-user/${id}`);

    return data;
  }

  async getOrderConfirmations(id: string): Promise<IOrderConfirmation[]> {
    const { data } = await this.api.get(`/order-confirmations/user/${id}`);

    return data;
  }
}

export const taskService = new TaskService();
