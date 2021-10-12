import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../persistence/api";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    //sorting by date
    get activitiesByDate () {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>  
            Date.parse(a.date) - Date.parse(b.date)
        )
    }

    //grouping by date
    get groupedActivities () {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
        }, {} as {[key: string]: Activity[]})
        )
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    setLoading = (state: boolean) => {
        this.loading = state;
    }
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    //loading all activity
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list()
            activities.forEach(activity => {
                this.setActivity(activity)
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    //logic to get activity in memory instead of your api
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(()=> {
                    this.selectedActivity = activity;
                })
                
                this.setLoadingInitial(false)
                return activity;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    //selecting activity details
    // selectActivity = (id: string) => {
    //     this.selectedActivity = this.activityRegistry.get(id);
        
    // }

    // //cancel activity details
    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // //open and closeFrom with setEditMode.
     
    // openForm = (id?: string) => {
    // id ? this.selectActivity(id) : this.cancelSelectedActivity();
    // this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    // createActivity
    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity)
            runInAction(()=> {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.setEditMode(false)
                this.setLoading(false);
            })
            
        } catch (error) {
            console.log(error)
            this.setLoading(false);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.setEditMode(false)
                this.setLoading(false);
            })
           
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.setLoading(false);
            })
            
        }
    }

    deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
        await agent.Activities.delete(id)
        runInAction(() => {
            this.activityRegistry.delete(id)
            this.setLoading(false)
        })
    } catch (error) {
        console.log(error)
        runInAction(()=> {
            this.setLoading(false)
        })
        
    }
    }
} 