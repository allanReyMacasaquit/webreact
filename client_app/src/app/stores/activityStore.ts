import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"


class ActivityStore {
    //properties
    //using map
    activityCollection = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    //auto observable constructor 
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityCollection.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date))
    }

    //create arrow function
    //get all activities
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
          const activities = await agent.Activities.list();
          activities.forEach(activity => {
              this.setActivity(activity);
           });
           this.setloadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setloadingInitial(false);
            
        }
    }

    loadActivity = async (id:string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }else { 
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                      this.selectedActivity = activity;
                })
                this.setloadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setloadingInitial(false)
                
                
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        // this.activities.push(activity);
        this.activityCollection.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityCollection.get(id);
    }

    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // //get single Activity by Id
    // selectActivity = (id: string) => {
    //     // this.selectedActivity = this.activities.find(a => a.id === id);
    //     this.selectedActivity = this.activityCollection.get(id);

    // }

    // //cancel activity
    // cancelselectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // //openForm activity
    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelselectedActivity();
    //     this.editMode = true;
    // }
    
    // //closeForm activity
    // closeForm = () => {
    //     this.cancelselectedActivity();
    //     this.editMode = false;
    // }

    //create
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            
            runInAction(() => {
                // this.activities.push(activity);
                this.activityCollection.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }

    }

    //update
    updateActivity = async (activity: Activity) => {
        this.loading = true;
         try {
             await agent.Activities.update(activity);
             runInAction(() => {
            //    this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
            this.activityCollection.set(activity.id, activity)
                this.selectedActivity = activity;
                 this.editMode = false;
                this.loading = false;
             })
         } catch (error) {
             console.log(error)
             runInAction(() => {
                 this.loading = false;
             })
         }
    }

    //delete
    deleteActivity = async (id: string) => {
        this.loading = true;
         
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== id )];
                this.activityCollection.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
             runInAction(() => {
                 this.loading = false;
             })
            
        }
    }



}

export default ActivityStore
