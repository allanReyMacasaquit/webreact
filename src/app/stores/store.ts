import ActivityStore from "./activityStore";
import CommonStore from "./common/commonStore";

interface Store {
    activityStore: ActivityStore;
    commonStore:  CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}