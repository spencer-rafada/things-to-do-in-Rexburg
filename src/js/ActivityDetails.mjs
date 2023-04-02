import { convertToJson } from "./utils.mjs";
import Activity from "./ActivityData.mjs";
const baseURL = "https://rexcube.onrender.com/";

export default class ActivityDetails{
    constructor(actId){
        this.activityId = actId;
        console.log(this.activityId);
        this.activity = [];
    }
    async init(){
        this.activity = await this.findActivityById(this.activityId);
        console.log(this.activity);
        document.querySelector(".details").innerHTML = this.activityDetailsRender(this.activity);
    }
    async getActivity(id) {
        const response = await fetch(baseURL + `activity/${id}`);
        const data = await convertToJson(response);
        return data;
      }

    async findActivityById(id) {
        const activity = await this.getActivity(id);
        return activity;
      }
      activityDetailsRender(activity) {
        return `<div class="activity-details">
                <a href="${activity.website}">
                  <img
                    src="${activity.image}"
                    alt="Image of ${activity.title} "/>
                </a>
                <div class="name">
                  <h1 class="activity__name">${activity.title}</h1>
                  <div class="like-btn">
                    <img src="../images/NavFavoritesFilled.png" alt="Like or Unlike the Activity" />
                  </div>
                </div>
                <h2>Description: ${activity.info}</h2>
              </div>`;
      }
}