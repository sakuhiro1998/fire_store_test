import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function Home(props) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const [userId, setUserId] = useState("");
    return (
        <React.Fragment>
            <p>
                {userInfo.userId}
            </p>
            <button onClick={() => dispatch(test())}> ボタン</button>
        </React.Fragment>
    )
};


export function test() {
    return dispatch => {
        alert("aaa");
    }
}