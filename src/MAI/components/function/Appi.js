import axios  from "axios";

export const createPerson = async (data) =>
    await axios.post('https://api2-one-iota.vercel.app/api'+ '/Alarm',data)