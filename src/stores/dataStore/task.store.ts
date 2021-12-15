import { makeAutoObservable, runInAction } from 'mobx';
import { IOrderConfirmation, ITaskModel, ITaskUsage, TaskModel } from 'models';
import { taskService } from 'services';
import { RootStore } from 'stores';

export class TaskStore {
  private rootStore: RootStore;

  collectionName = 'tasks';

  tasks: TaskModel[] = [];

  selectedTask: TaskModel | null = null;

  loading = false;

  taskUsage: ITaskUsage = {
    numberOfTasksInUse: 0,
    numberOfTotalAllowedTasks: 0,
  };

  orderConfirmations: IOrderConfirmation[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  private setLoading = (status = false): void => {
    runInAction(() => {
      this.loading = status;
    });
  };

  getOrderConfirmations = async (userId: string): Promise<void> => {
    try {
      this.setLoading(true);

      const orderconfirmations = await taskService.getOrderConfirmations(userId);
      if (!orderconfirmations) throw new Error('Something went wrong!');

      this.orderConfirmations = orderconfirmations;
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
    this.setLoading();
  };

  getTaskUsageForUser = async (userId: string): Promise<void> => {
    try {
      this.setLoading(true);

      const taskUsage = await taskService.getTaskUsage(userId);
      if (!taskUsage) throw new Error('Something went wrong!');

      this.taskUsage = taskUsage;
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
    this.setLoading();
  };

  getAllTasksForUserAsync = async (userId: string): Promise<TaskModel[]> => {
    try {
      this.setLoading(true);

      const taskList = await taskService.getTasksForUser(userId);
      if (!taskList) throw new Error('Something went wrong!');

      this.tasks = taskList
        .filter((task) => task.unitsPurchased < task.targetQuantity)
        .sort()
        .map((task) => new TaskModel(task, this.rootStore));
      runInAction(() => {});
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();

    return this.tasks;
  };

  addAsync = async (task: ITaskModel, cb: () => void): Promise<TaskModel | undefined> => {
    try {
      this.setLoading(true);

      const data = await taskService.addTask(task);
      if (!data) throw new Error('Unable to create task!');

      cb();

      const newTask = new TaskModel(data, this.rootStore);

      runInAction(() => {
        this.tasks = [newTask, ...this.tasks].sort();
        this.rootStore.uiStore.notificationStore.sendNotification('Task added successfully!', 'success');
      });
      return newTask;
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }

    this.setLoading();
  };

  getByIDAsync = async (id: string): Promise<TaskModel | null> => {
    try {
      this.setLoading(true);
      const task = await taskService.getTaskByID(id);
      if (!task) throw new Error('Something went wrong!');

      runInAction(() => {
        this.selectedTask = new TaskModel(task, this.rootStore);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
    this.setLoading();
    return this.selectedTask;
  };

  updateByIDAsync = async (task: ITaskModel, cb?: () => void): Promise<void> => {
    try {
      const status = await taskService.updateTaskByID(task.id, task);
      if (!status) throw new Error('Unable to update task!');

      if (cb) {
        cb();
      }

      runInAction(() => {
        this.rootStore.uiStore.notificationStore.sendNotification('Task updated successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  updateRunning = async (isRunning: boolean, taskId: string): Promise<void> => {
    try {
      runInAction(() => {
        const index = this.tasks.findIndex((task) => task.id === taskId);
        const updatedTask = this.tasks[index];
        updatedTask.isRunning = isRunning;
        this.tasks = [...this.tasks];
        this.rootStore.uiStore.notificationStore.sendNotification('Task updated successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  updatePurchased = (taskId: string, unitPurchased: number): void => {
    runInAction(() => {
      const index = this.tasks.findIndex((task) => task.id === taskId);
      const updatedTask = this.tasks[index];
      updatedTask.unitsPurchased = unitPurchased;
      this.tasks = [...this.tasks];
    });
  };

  removeByIDAsync = async (id: string): Promise<void> => {
    try {
      const status = await taskService.deleteTask(id);
      if (!status) throw new Error('Unable to remove task!');

      runInAction(() => {
        const index = this.tasks.findIndex((u) => u.id === id);
        if (index < 0) return;

        this.tasks.splice(index, 1);
        this.rootStore.uiStore.notificationStore.sendNotification('Task removed successfully!', 'success');
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  startTask = async (id: string, cvv: string): Promise<void> => {
    try {
      const wasSuccessful = await taskService.startTaskWithCvv(id, cvv);
      if (!wasSuccessful) throw new Error('Unable to start task');

      runInAction(() => {
        this.updateRunning(true, id);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  stopTask = async (id: string): Promise<void> => {
    try {
      const wasSuccessful = await taskService.updateRunning(id, false);
      if (!wasSuccessful) throw new Error('Unable to update task!');

      runInAction(() => {
        this.updateRunning(false, id);
      });
    } catch (err: any) {
      runInAction(() => {
        this.rootStore.uiStore.notificationStore.handleError(err);
      });
    }
  };

  removeSelected = (): void => {
    this.selectedTask = null;
  };
}
