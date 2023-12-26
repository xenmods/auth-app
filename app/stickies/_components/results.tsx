'use client';

import { Editor as NovelEditor } from "novel-without-ai";
import Heading from "@tiptap/extension-heading";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";

function formatDateWithZero(input) {
    // Check if input is a string or a number (timestamp), and convert to Date object
    const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input;
  
    // Check if the input is now a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date value');
    }
  
    const options = { month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day] = formattedDate.split(' ');
  
    // Add a leading zero to the day if it's a single digit
    const dayWithZero = day.length === 1 ? `0${day}` : day;
  
    return `${month} ${dayWithZero}`;
  }


export default function Results() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [firstLoad, setFirstLoad] = useState(null);
    const [stickies, setStickies] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (loading === true) return;
        if (firstLoad === null) {
            setFirstLoad(true);
        }
        if (firstLoad === true) {
            setFirstLoad(false);
        }
        if (!isLoaded) return;
        setLoading(true);

        if (isSignedIn) {
            fetch('/api/user_stickies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    user_id: user.id,
                }),
            }).then((response) => response.json())
            .then((data) => {
                data = data.reverse();
                setStickies(data);
            })
        } else {
            setStickies([]);
            }
        console.log(stickies);
        setLoading(false)
        
    }, [isSignedIn, user, isLoaded]);
    return (
        <>
            <div>
            {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
            <div className="loader">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
        </div>
      ) : null}
                {loading || firstLoad ? (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
                        <div className="loader">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
                    </div>
                ) : stickies.length === 0 ? (
                    <div className="flex items-center justify-center w-full mt-8">
                        <h1 className="text-2xl font-semibold">No Stickies Found :/</h1>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full mt-8">
                        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-white font-semibold hover:bg-white">Your Stickies</h1>
                    </div>
                )}
                {loading ? null :
                <div className="mt-5 mx-2 grid grid-cols-1 gap-2 overflow-hidden py-3 sm:grid-cols-2 md:grid-cols-3">
                    {stickies.map((sticky) => {
                        return (
                            <div className="relative space-y-2 w-full h-[220px] rounded-2xl bg-black/80 overflow-hidden backdrop-blur-md hover:bg-black border border-sm border-gray-500/80 shadow-lg transition-all ease-in-out">
                                <a href={`/${sticky.id}`} className="absolute inset-0 bg-transparent z-10"></a>
                                <div key={sticky} style={{ zoom: '70%' }}>
                                    <NovelEditor
                                        className="rounded-2xl"
                                        extensions={[Heading.configure({ HTMLAttributes: { className: "text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-white font-semibold" } })]}
                                        disableLocalStorage
                                        defaultValue={JSON.parse(sticky.content)}
                                    />

                                    {firstLoad === true ? setFirstLoad(false) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>}
            </div>
        </>
    );
}
