import React, { useEffect, useState } from "react";
import axios from "../core"

const renderTextInfo = (hash) => {
    if(hash.hash) {
        if(hash.verified){
            return{
                status: 'success',
                message: 'Аккаунт успешно подтверждён!'
            };
        } else {
            return{
                status: "error",
                message: 'Ошибка при подтверждении аккаунта.'
            } 
        }
    } else {
        return{
            status: "success",
            message: 'Ссылка с подтверждением аккаунта отправлена по указанному вами E-mail адресу.'
        } 
    }
}

const CheckEmailInfo = ({location, history}) => {
    const hash = location.search.split('hash=')[1];
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(!!hash);
    const [info, setInfo] = useState(renderTextInfo({ hash, verified }));

    const setStatus = ({ checking, verified }) => {
        setInfo(renderTextInfo({ hash, verified }));
        setVerified(verified);
        setChecking(checking);
    };

    useEffect(() => {
        if (hash) {
            axios.get("api/user/verify?hash=" + hash)
            .then(() => {
            setStatus({  checking: false, verified: true });
            setTimeout(() => history.push('/signin'), 5000);
            })
            .catch(() => {
            setStatus({ checking: false, verified: false });
            });
        }
    }, []);

    console.log({ info, checking, verified, hash });

    return (
        <div>
            <h1>{info.status === 'success' ? 'Готово!' : 'Ошибка'}</h1>
            <h2>{info.message}</h2>
        </div>
    );
}

export default CheckEmailInfo;