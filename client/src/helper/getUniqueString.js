export default function getUniqueString(){
    const d = new Date();
    return d.getTime().toString();
}