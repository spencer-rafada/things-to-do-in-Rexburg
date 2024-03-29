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
    // searching for an activity and displaying the results
     async searchActivity(key) {
        const searchInstert = document.querySelector("#activity-list");
        searchInstert.innerHTML = "";
        const list = await this.getActivity();
        const activities = list.filter(item => item.title.toLowerCase().includes(key.toLowerCase()));
        const render = activities.map(this.activityCardTemplate);
        searchInstert.insertAdjacentHTML("afterbegin", render.join(""));
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
                <button onclick="location.href='../../activity-details/index.html?activity=${activity._id}'" class="lookup-button" >Look Up</button>
              </li>`;
      }
      renderActivity(activity) {
        const render = activity.map(this.activityCardTemplate);
        const elementActivity = document.getElementById("activity-list");
        elementActivity.insertAdjacentHTML("afterbegin", render.join(""));
      }
}