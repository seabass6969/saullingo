export enum GreetingTime {
    morning = "Good Morning",
    afternoon = "Good Afternoon",
    night = "Good Night"
}
export const timeText = ():GreetingTime => {
    let date = new Date()
    if (date.getHours() <= 11 && date.getHours() >= 6){
        return GreetingTime.morning
    }else if (date.getHours() >= 11 && date.getHours() <= 18){
        return GreetingTime.afternoon
    }else {
        return GreetingTime.night
    }
}
export const emojiText = () => {
    let times = timeText()
    if(times == GreetingTime.morning){
        return "/emoji/happy.png"
    }else if(times == GreetingTime.afternoon){
        return "/emoji/sun.png"
    }else if(times == GreetingTime.night){
        return "/emoji/night.png"
    }
}