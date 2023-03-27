import { convertToJson } from "./utils.mjs";

export default class Activity{
    constructor(category){
        this.category = category;
        this.path = "https://rexcube.onrender.com/activity";
        this.activity = [];
    }
    async init(){
        this.activity = await this.getActivity();
        console.log(this.activity);
        this.renderActivity(this.activity);
    }
    getActivity(){
        return fetch(this.path)
        .then(convertToJson)
        .then((data)=>data);
    }
    activityCardTemplate(activity) {
        return `<li class="activity-card">
                <a href="${activity.website}">
                <img
                  src="${activity.image}"
                  alt="Image of ${activity.title} "
                />
                <h2 class="activity__name">${activity.title}</h2>
                </a>
                <button class="lookup-button" data-id="${activity.id}">Look Up</button>
              </li>`;
      }
      renderActivity(activity) {
        const render = activity.map(this.activityCardTemplate);
        const elementActivity = document.getElementById("activity-list");
        elementActivity.insertAdjacentHTML("afterbegin", render.join(""));
      }

      async findActyvityById(Id){
        const activities = await this.getActivity();
        return activities.find((item)=>item.id === Id);
      }
}