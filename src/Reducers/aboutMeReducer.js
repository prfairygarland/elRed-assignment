const initialData = {
    aboutMeText: "No about me added yet!",
    bloodGroup: "No Bloog Group",
    resumeUrl: ""
}

const aboutMeReducer = (state = initialData, action) => {
    switch (action.type) {
        case "SAVE" :
            return {
                ...state,
                aboutMeText: action.payload.aboutMeText,
                bloodGroup: action.payload.bloodGroup,
                resumeUrl: action.payload.resumeUrl,
            }
        default: 
        return state;
    }
}

export default aboutMeReducer;