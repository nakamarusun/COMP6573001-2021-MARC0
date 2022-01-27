import { useRef, useState } from 'react';
import { useAuth } from '../services/firebase/AuthContext';
import { robot } from '../services/export/exportAssets'
import { useNavigate } from 'react-router'
import { Username, SignOutButton } from '../services/export/exportComponents'
import { host } from '../config';


const PairMarc1 = () => {


    const { currentUser, setIsPaired } = useAuth()
    const uuidRef = useRef()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const marciUID = useRef()
    const [success, setSuccess] = useState(false)

    function pairMarci() {
        // get UUID to pair marci here
        if (currentUser !== null) {
            const token = currentUser.getIdToken().then(token =>
                fetch(`${host}/user/setup`, {
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ marciUID: marciUID.current.value })
                }).then(res => {
                    if (res.status === 200) {
                        setSuccess(true)
                    }
                }).catch(err => {
                    console.log(err)
                    setError('Failed to pair with Marc1')
                })
            );
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await pairMarci()
            if (success) {
                alert('Paired Successfully')
                setIsPaired(true)
                setError('')
                setSuccess(false)
                navigate("/mainmenu")
            }
        }
        catch {
            setError('Failed to pair with your M4RC1')
        }
        setLoading(false)
    }

    return (
        <div className="w-full mt-20 text-center">
            <div className='absolute top-5 right-5 w-3/4 flex flex-row-reverse'>
                <SignOutButton title="Sign Out" />
            </div>
            <div className='w-3/4 flex flex-col items-center justify-center m-auto'>
                <div className='w-10/12'>
                    <p className='text-xl'>Hey {<Username />}!&#9995;</p>
                    <img className='mt-12' src={robot} alt='robot'></img>
                </div>
                <div className='w-11/12'>
                    <h2 className='font-bold text-2xl my-6'>Pair your M4rc1!</h2>
                    <form className="" onSubmit={handleSubmit}>
                        <input className="w-3/4 shadow-sm p-2 ring-1 ring-gray-200 rounded" type="password" ref={uuidRef} placeholder="M4RC1 UUID" ref={marciUID} required />
                        {error && <div className="mt-3">{error}</div>}
                        <button disabled={loading} className='w-3/4 bg-blue-crayola text-cultured p-2 rounded-md mt-3' type='submit' value="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PairMarc1;