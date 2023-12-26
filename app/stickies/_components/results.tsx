'use client';

import { Editor as NovelEditor } from "novel-without-ai";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
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
                setStickies(data);
                console.log(data);
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
          {/* <div className="flex items-center justify-center h-20 w-20 rounded-full">
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mx-auto"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          </div> */}
        </div>
      ) : null}
                {loading || firstLoad ? (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
                        <div className="loader">
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
</div>
                        {/* <div className="flex items-center justify-center h-20 w-20 rounded-full">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mx-auto"
                                role="status"
                            >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        </div> */}
                    </div>
                ) : stickies.length === 0 ? (
                    <div className="flex items-center justify-center w-full mt-8">
                        <h1 className="text-2xl font-semibold">No Stickies Found :/</h1>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full mt-8">
                        <h1 className="text-2xl font-semibold">Your Stickies</h1>
                    </div>
                )}
                {loading ? null :
                <div className="mt-5 mx-2 grid grid-cols-1 gap-2 overflow-hidden py-3 sm:grid-cols-2 md:grid-cols-3">
                    {stickies.map((sticky) => {
                        return (
                            <div className="relative space-y-2 w-full h-[220px] rounded-2xl bg-black/30 overflow-hidden backdrop-blur-md hover:bg-black transition-all ease-in-out">
                            <a href={`/${sticky.id}`} key={sticky}  style={{zoom: '70%'}}>
                                <NovelEditor
                                    className="rounded-2xl"
                                    disableLocalStorage
                                    defaultValue={JSON.parse(sticky.content)}
                                />
                                
                                {firstLoad === true ? setFirstLoad(false) : null}
                            </a>
                                {/* <p className="shadow-2xl mb-3 absolute bottom-0 m-3">{ formatDateWithZero(sticky.createdAt) }</p> */}
                            </div>
                        );
                    })}
                </div>}
            </div>
        </>
    );
}
