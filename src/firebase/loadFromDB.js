import firebase from "firebase";

export const loadDataQuestions = path => loadData(`/${path}/questions`);
export const loadDataCategories = () => loadData(`/category`);

export const loadData = path => firebase.database().ref(path).once('value').then(data => data.val());