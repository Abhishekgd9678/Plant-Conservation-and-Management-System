import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const PlantData = () => {

  const [data,setData] = useState();
    const {id} = useParams();
    useEffect(()=>{
        getdata();
    },[]);

    const getdata =async ()=>{
        const response =await axios.post("http://localhost:3000/plantdata",{
            id:id
        });
        console.log(response.data);
        setData(response.data[0])
    }
  return (
    <div className='mx-20 flex gap-4 flex-col'>
        <div className='flex justify-between mx-10'>
          <div className='flex flex-col text-lg gap-3'>
            <div className='flex gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              className='h-16'
              >
                <path fill="#BF6B29" d="M14 18.5c0-1.247.8-2.458.984-2.718a5.392 5.392 0 0 1-1.713-.447c-1.31-.59-2.624-.618-3.612-.075a4.39 4.39 0 0 1-.665.29C9.28 16.03 10 17.352 10 18.5c0 1.636-.465 3.758-1.354 4.646A.5.5 0 0 0 9 24h6a.5.5 0 0 0 .354-.854C14.464 22.258 14 20.136 14 18.5z"/><path fill="#010101" d="M15.462 23.441a.5.5 0 0 1-.462.309H9a.5.5 0 0 1-.462-.309c-.01-.025-.002-.052-.008-.078a.485.485 0 0 0 .008.328A.5.5 0 0 0 9 24h6a.5.5 0 0 0 .462-.309.485.485 0 0 0 .008-.328c-.006.026.002.053-.008.078z" opacity=".1"/><linearGradient id="a" x1="10.709" x2="14.929" y1="14.419" y2="18.64" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#010101" stop-opacity=".1"/>
                <stop offset="1" stop-color="#010101" stop-opacity="0"/></linearGradient>
                <path fill="url(#a)" d="M13.27 15.335c-1.308-.59-2.623-.618-3.61-.075a4.388 4.388 0 0 1-.63.274l.058.176 5.214 5.215A10.439 10.439 0 0 1 14 18.5c0-1.247.8-2.458.984-2.718a5.392 5.392 0 0 1-1.713-.447z"/><path fill="#68B345" d="M18.959 6.23C18.573 2.72 15.558 0 12 0a7.008 7.008 0 0 0-6.96 7.752 4.476 4.476 0 0 0-2.008 4.297c.233 1.956 1.81 3.594 3.752 3.895.24.037.48.056.719.056.756 0 1.49-.187 2.156-.553.988-.542 2.303-.515 3.612.076a5.506 5.506 0 0 0 3.347.366c2.108-.42 3.819-2.108 4.258-4.203.436-2.078-.297-4.145-1.917-5.456z"/><path fill="#FFF" d="M15.5 5.25c1.824 0 3.454.831 4.531 2.135C19.04 5.945 17.381 5 15.5 5s-3.54.945-4.531 2.385A5.863 5.863 0 0 1 15.5 5.25z" opacity=".1"/>
                <path fill="#FFF" d="M12 .25a7.12 7.12 0 0 1 6.695 4.708 7 7 0 0 0-13.39 0A7.119 7.119 0 0 1 12 .25z" opacity=".2"/>
                <path fill="#FFF" d="M7.875 7.25c.668 0 1.304.136 1.883.379A4.454 4.454 0 0 0 7.5 7 4.5 4.5 0 0 0 3 11.5c0 .107.024.207.031.313C3.196 9.268 5.29 7.25 7.875 7.25z" opacity=".1"/><linearGradient id="b" x1="3.6" x2="19.182" y1="8.45" y2="15.716" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF" stop-opacity=".2"/><stop offset="1" stop-color="#FFF" stop-opacity="0"/></linearGradient><path fill="url(#b)" d="M18.959 6.23C18.573 2.72 15.558 0 12 0a7.008 7.008 0 0 0-6.96 7.752 4.476 4.476 0 0 0-2.008 4.297c.233 1.956 1.81 3.594 3.752 3.895a4.456 4.456 0 0 0 2.301-.236c.323.568.915 1.748.915 2.792 0 1.636-.465 3.758-1.354 4.646A.5.5 0 0 0 9 24h6a.5.5 0 0 0 .354-.854C14.464 22.258 14 20.136 14 18.5c0-1.065.58-2.097.866-2.54a5.657 5.657 0 0 0 1.752-.071c2.108-.42 3.819-2.108 4.258-4.203.436-2.078-.297-4.145-1.917-5.456z"/>
              </svg>
              <div>
                <h1 className='text-3xl font-semibold'>{data?.commonname}</h1>
                <h1 className='text-opacity-75 text-base italic'>{data?.scientificname}</h1>
              </div>
            </div>
          </div>
          <div>
          <div className="w-full pr-2 mb-6">
          <div className="shadow rounded-2xl p-4 bg-white">
            <div className="flex w-full">    
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              className='h-8 w-8 flex'
              >
                <path fill="#b2b1ff" d="M12 22a.993.993 0 0 1-.65-.241C11.049 21.502 4 15.397 4 10a8 8 0 0 1 16 0c0 5.397-7.049 11.502-7.35 11.759A.993.993 0 0 1 12 22Z"/>
              <path fill="#6563ff" d="M12 14a4 4 0 1 1 4-4 4.004 4.004 0 0 1-4 4Z"/></svg>
              <p className="text-md text-black ml-2">Location</p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-gray-700 text-2xl text-left font-bold my-4">
                {data?.location}
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>

        <div className='h-16'>
        <div className="flex flex-col flex-wrap sm:flex-row">
      <div className="w-full md:w-4/12 pr-2 mb-6">
        <div className="shadow rounded-2xl p-4 bg-white">
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          className='h-8'
          >
            <g transform="translate(0 -1004.362)">
              <circle cx="24" cy="1028.362" r="24" fill="#50b748" fill-rule="evenodd"/>
              <path
              fill="#fff" d="M28.474 1011.386a.5.5 0 0 0-.059.01c-.804.129-1.578.4-2.283.804-2.24 1.297-3.473 3.718-3.385 6.211a6.525 6.525 0 0 0-5.154-2.539.5.5 0 0 0-.002 0c-.774 0-1.54.145-2.266.418a.5.5 0 0 0-.322.523c.375 3.334 3.176 5.863 6.504 5.866a.5.5 0 0 0 .002 0 6.41 6.41 0 0 0 1.59-.207v5.89H16.35a.795.795 0 0 0-.785.787v2.422c0 .427.357.787.785.787h.343l1.225 11.004h11.31l1.227-11.004h.324c.428 0 .786-.36.786-.787v-2.422a.795.795 0 0 0-.786-.787H24.1v-1.326c.32.071.645.12.974.121a.5.5 0 0 0 .002 0c2.312 0 4.268-1.727 4.53-4.008a.5.5 0 0 0-.325-.527 4.603 4.603 0 0 0-1.576-.283.5.5 0 0 0-.002 0 4.568 4.568 0 0 0-3.603 1.758v-2.272a.5.5 0 0 0 0-.076v-.492a6.725 6.725 0 0 0 2.058-.76.5.5 0 0 0 .002 0c3.024-1.75 4.22-5.55 2.793-8.81a.5.5 0 0 0-.478-.3zm-.332 1.144c.948 2.704-.037 5.68-2.485 7.098-.325.186-.68.301-1.04.402l2.44-3.203a.5.5 0 0 0-.425-.809.5.5 0 0 0-.371.204l-2.338 3.072c-.486-2.45.52-4.961 2.707-6.229.467-.267.99-.407 1.512-.535zm-10.55 4.342h.003c2.313 0 4.271 1.46 5.084 3.547l-2.88-1.53a.5.5 0 0 0-.24-.062.5.5 0 0 0-.228.946l3.264 1.734c-.358.092-.718.17-1.088.172-2.666 0-4.865-1.932-5.377-4.537.48-.136.963-.268 1.463-.27zm10.11 6.467h.002c.234 0 .456.077.684.123-.404 1.524-1.669 2.693-3.31 2.695-.08 0-.159-.018-.237-.03l1.572-.93a.5.5 0 0 0-.236-.934.5.5 0 0 0-.272.07l-1.046.619c.604-.963 1.618-1.614 2.843-1.615zm-11.136 6.023h14v1.994h-14v-1.996zm1.132 2.996H29.45l-1.115 10.004h-9.521l-1.116-10.004z"
               color="#000" overflow="visible"/>
          </g></svg>
            <p className="text-md text-black ml-2">
              Count
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 text-4xl text-left font-bold my-4">
              {data?.count}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-4/12 pr-2 mb-6">
        <div className="shadow rounded-2xl p-4 bg-white">
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          className='h-8'
          >
            <g transform="translate(0 -1004.362)">
              <circle cx="24" cy="1028.362" r="24" fill="#50b748" fill-rule="evenodd"/>
              <path
              fill="#fff" d="M28.474 1011.386a.5.5 0 0 0-.059.01c-.804.129-1.578.4-2.283.804-2.24 1.297-3.473 3.718-3.385 6.211a6.525 6.525 0 0 0-5.154-2.539.5.5 0 0 0-.002 0c-.774 0-1.54.145-2.266.418a.5.5 0 0 0-.322.523c.375 3.334 3.176 5.863 6.504 5.866a.5.5 0 0 0 .002 0 6.41 6.41 0 0 0 1.59-.207v5.89H16.35a.795.795 0 0 0-.785.787v2.422c0 .427.357.787.785.787h.343l1.225 11.004h11.31l1.227-11.004h.324c.428 0 .786-.36.786-.787v-2.422a.795.795 0 0 0-.786-.787H24.1v-1.326c.32.071.645.12.974.121a.5.5 0 0 0 .002 0c2.312 0 4.268-1.727 4.53-4.008a.5.5 0 0 0-.325-.527 4.603 4.603 0 0 0-1.576-.283.5.5 0 0 0-.002 0 4.568 4.568 0 0 0-3.603 1.758v-2.272a.5.5 0 0 0 0-.076v-.492a6.725 6.725 0 0 0 2.058-.76.5.5 0 0 0 .002 0c3.024-1.75 4.22-5.55 2.793-8.81a.5.5 0 0 0-.478-.3zm-.332 1.144c.948 2.704-.037 5.68-2.485 7.098-.325.186-.68.301-1.04.402l2.44-3.203a.5.5 0 0 0-.425-.809.5.5 0 0 0-.371.204l-2.338 3.072c-.486-2.45.52-4.961 2.707-6.229.467-.267.99-.407 1.512-.535zm-10.55 4.342h.003c2.313 0 4.271 1.46 5.084 3.547l-2.88-1.53a.5.5 0 0 0-.24-.062.5.5 0 0 0-.228.946l3.264 1.734c-.358.092-.718.17-1.088.172-2.666 0-4.865-1.932-5.377-4.537.48-.136.963-.268 1.463-.27zm10.11 6.467h.002c.234 0 .456.077.684.123-.404 1.524-1.669 2.693-3.31 2.695-.08 0-.159-.018-.237-.03l1.572-.93a.5.5 0 0 0-.236-.934.5.5 0 0 0-.272.07l-1.046.619c.604-.963 1.618-1.614 2.843-1.615zm-11.136 6.023h14v1.994h-14v-1.996zm1.132 2.996H29.45l-1.115 10.004h-9.521l-1.116-10.004z"
               color="#000" overflow="visible"/>
          </g></svg>
            <p className="text-md text-black ml-2">Age</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 text-4xl text-left font-bold my-4">
              {data?.age}
            </p>

          </div>
        </div>
      </div>
      <div className="w-full md:w-4/12">
        <div className="shadow rounded-2xl p-4 bg-white">
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          className='h-8'
          >
            <g transform="translate(0 -1004.362)">
              <circle cx="24" cy="1028.362" r="24" fill="#50b748" fill-rule="evenodd"/>
              <path
              fill="#fff" d="M28.474 1011.386a.5.5 0 0 0-.059.01c-.804.129-1.578.4-2.283.804-2.24 1.297-3.473 3.718-3.385 6.211a6.525 6.525 0 0 0-5.154-2.539.5.5 0 0 0-.002 0c-.774 0-1.54.145-2.266.418a.5.5 0 0 0-.322.523c.375 3.334 3.176 5.863 6.504 5.866a.5.5 0 0 0 .002 0 6.41 6.41 0 0 0 1.59-.207v5.89H16.35a.795.795 0 0 0-.785.787v2.422c0 .427.357.787.785.787h.343l1.225 11.004h11.31l1.227-11.004h.324c.428 0 .786-.36.786-.787v-2.422a.795.795 0 0 0-.786-.787H24.1v-1.326c.32.071.645.12.974.121a.5.5 0 0 0 .002 0c2.312 0 4.268-1.727 4.53-4.008a.5.5 0 0 0-.325-.527 4.603 4.603 0 0 0-1.576-.283.5.5 0 0 0-.002 0 4.568 4.568 0 0 0-3.603 1.758v-2.272a.5.5 0 0 0 0-.076v-.492a6.725 6.725 0 0 0 2.058-.76.5.5 0 0 0 .002 0c3.024-1.75 4.22-5.55 2.793-8.81a.5.5 0 0 0-.478-.3zm-.332 1.144c.948 2.704-.037 5.68-2.485 7.098-.325.186-.68.301-1.04.402l2.44-3.203a.5.5 0 0 0-.425-.809.5.5 0 0 0-.371.204l-2.338 3.072c-.486-2.45.52-4.961 2.707-6.229.467-.267.99-.407 1.512-.535zm-10.55 4.342h.003c2.313 0 4.271 1.46 5.084 3.547l-2.88-1.53a.5.5 0 0 0-.24-.062.5.5 0 0 0-.228.946l3.264 1.734c-.358.092-.718.17-1.088.172-2.666 0-4.865-1.932-5.377-4.537.48-.136.963-.268 1.463-.27zm10.11 6.467h.002c.234 0 .456.077.684.123-.404 1.524-1.669 2.693-3.31 2.695-.08 0-.159-.018-.237-.03l1.572-.93a.5.5 0 0 0-.236-.934.5.5 0 0 0-.272.07l-1.046.619c.604-.963 1.618-1.614 2.843-1.615zm-11.136 6.023h14v1.994h-14v-1.996zm1.132 2.996H29.45l-1.115 10.004h-9.521l-1.116-10.004z"
               color="#000" overflow="visible"/>
          </g></svg>
            <p className="text-md text-black md:ml-4">Expected Lifetime</p>
          </div>
          <div className="flex w-full flex-col justify-center">
            <p className="text-gray-700 text-left text-4xl font-bold my-4">
              {data?.expected_lifetime}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-between w-full'>
      <div className="shadow-lg rounded-xl w-full md:w-5/12 mt-8 md:ml-2 p-4 bg-white text-gray-700 relative overflow-hidden">
          <div className="w-full flex flex-col gap-3">
            <p className="text-gray-700 text-2xl font-light mb-4">
              Climate Requirements
            </p>
            <div className="flex items-center justify-between text-gray-400  ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
              <p>Sunlight</p>
              <p>{data?.sunlight}/12</p>
            </div>
            <div className="w-full h-2 bg-green-100 rounded-full mb-4">
              <div style={{ width: `${(data?.sunlight / 12) * 100}%` }} className={`h-full text-center text-xs text-white bg-green-400 rounded-full`} />
            </div>
            <div className="flex items-center justify-between text-gray-400 ">        
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" 
              className='h-7'
              >
                <path fill="#222" 
                d="M32 54a16.06 16.06 0 0 1-16-16c0-16 14.77-27.33 15.4-27.81a1 1 0 1 1 1.2 1.6C32.46 11.9 18 23 18 38a14.06 14.06 0 0 0 14 14 1 1 0 0 1 0 2Z"/><path fill="#222" d="M32 54a1 1 0 1 1 0-2 14.06 14.06 0 0 0 14-14c0-15-14.46-26.1-14.6-26.21a1 1 0 0 1 1.2-1.6C33.23 10.67 48 22 48 38a16.06 16.06 0 0 1-16 16Z"/>
                <path fill="#222" d="M26.9 44.45a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l10.2-10.2A1 1 0 0 1 37.81 34l-10.2 10.2a1 1 0 0 1-.71.25zm.78-6.96a3.43 3.43 0 0 1-2.44-1 3.46 3.46 0 0 1 0-4.89 3.53 3.53 0 0 1 4.89 0 3.46 3.46 0 0 1-2.45 5.9zm0-4.91A1.43 1.43 0 0 0 26.23 34a1.45 1.45 0 0 0 .42 1 1.47 1.47 0 0 0 2.06 0 1.42 1.42 0 0 0 .43-1 1.44 1.44 0 0 0-.43-1 1.45 1.45 0 0 0-1.03-.42zm8.64 13.54a3.46 3.46 0 0 1-2.45-5.9 3.55 3.55 0 0 1 4.89 0 3.46 3.46 0 0 1 0 4.89 3.41 3.41 0 0 1-2.44 1.01zm0-4.91a1.47 1.47 0 0 0-1.46 1.46 1.44 1.44 0 0 0 .43 1 1.49 1.49 0 0 0 2.06 0 1.47 1.47 0 0 0 .42-1 1.45 1.45 0 0 0-.42-1 1.44 1.44 0 0 0-1.03-.46z"/>
                </svg>
              <p>Humidity</p>
              <p>{data?.humidity} %</p>
            </div>
            <div className="w-full h-2 bg-indigo-100 rounded-full mb-4">
              <div style={{width: `${(data?.humidity)}%`}} className="h-full text-center text-xs text-white bg-indigo-400 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-gray-400  ">              
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 60 60" viewBox="0 0 60 60"
              className='h-6'
              >
                <path fill="#e7eef9" d="M32.55,36.99V10.1c0-2.26-1.83-4.1-4.1-4.1s-4.1,1.83-4.1,4.1v26.9c-2.91,1.49-4.9,4.51-4.9,8.01
                  c0,4.97,4.03,9,9,9c4.97,0,9-4.03,9-9C37.46,41.51,35.46,38.48,32.55,36.99z"/>
                  <path d="M28.46,55c-5.51,0-10-4.49-10-10c0-3.56,1.86-6.8,4.9-8.6V10.1c0-2.81,2.29-5.1,5.1-5.1s5.1,2.29,5.1,5.1V36.4
                  c3.04,1.8,4.9,5.04,4.9,8.6C38.46,50.51,33.97,55,28.46,55z M28.46,7c-1.71,0-3.1,1.39-3.1,3.1v26.9
                  c0,0.38-0.21,0.72-0.54,0.89c-2.69,1.38-4.36,4.11-4.36,7.12c0,4.41,3.59,8,8,8s8-3.59,8-8c0-3.01-1.67-5.74-4.36-7.12
                  c-0.33-0.17-0.54-0.51-0.54-0.89V10.1C31.55,8.39,30.17,7,28.46,7z"/>
                  <circle cx="28.46" cy="45" r="3.88" fill="#e3334f"/>
                  <path d="M28.46,49.88c-2.69,0-4.88-2.19-4.88-4.88s2.19-4.88,4.88-4.88s4.88,2.19,4.88,4.88S31.15,49.88,28.46,49.88z
                  M28.46,42.13c-1.58,0-2.88,1.29-2.88,2.88s1.29,2.88,2.88,2.88s2.88-1.29,2.88-2.88S30.04,42.13,28.46,42.13z"/>
                  <path d="M28.46 42.13c-.55 0-1-.45-1-1V15.42c0-.55.45-1 1-1s1 .45 1 1v25.71C29.46 41.68 29.01 42.13 28.46 42.13zM40.54 12.17h-4.25c-.55 0-1-.45-1-1s.45-1 1-1h4.25c.55 0 1 .45 1 1S41.09 12.17 40.54 12.17zM39.13 17.17h-2.83c-.55 0-1-.45-1-1s.45-1 1-1h2.83c.55 0 1 .45 1 1S39.68 17.17 39.13 17.17zM40.54 22.17h-4.25c-.55 0-1-.45-1-1s.45-1 1-1h4.25c.55 0 1 .45 1 1S41.09 22.17 40.54 22.17zM39.13 27.17h-2.83c-.55 0-1-.45-1-1s.45-1 1-1h2.83c.55 0 1 .45 1 1S39.68 27.17 39.13 27.17zM40.54 32.17h-4.25c-.55 0-1-.45-1-1s.45-1 1-1h4.25c.55 0 1 .45 1 1S41.09 32.17 40.54 32.17z"/>
                  </svg>
              <p>Temperature</p>
              <p>{data?.temperature} C</p>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
              <div style={{ width: `${(data?.temperature)}%` }} className="h-full text-center text-xs text-white bg-blue-400 rounded-full" />
            </div>
          </div>
      </div>

      <div className="shadow-lg rounded-xl w-full md:w-5/12 md:ml-4 mt-8 p-4 bg-white relative overflow-hidden text-lg">
          <div className='flex items-center w-full justify-between'>
            <h1 className='text-2xl font-light mb-5'>Taxon Details</h1>
          </div>
        <div className="flex items-center mb-6 rounded justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex   flex-col w-full ml-2 items-start justify-between">
              <p>Kingdom</p>
            </div>
            <span className="text-green-400">{data?.kingdom}</span>
          </div>
        </div>
        <div className="flex items-center mb-6 rounded justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-full ml-2 items-start justify-between">
              <p >Family</p>
            </div>
            <span className="text-green-400">{data?.family}</span>
          </div>
        </div>
        <div className="flex items-center mb-6 rounded justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex   flex-col w-full ml-2 items-start justify-between">
              <p >Phylum</p>
            </div>
            <span className="text-red-400">{data?.phylum}</span>
          </div>
        </div>
        <div className="flex items-center rounded justify-between">
          <div className="flex items-center w-full justify-between">
            <div className="flex   flex-col w-full ml-2 items-start justify-between">
              <p>Class</p>
            </div>
            <span className="text-green-400">{data?.class}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div className='h-28'></div>
    </div>
    </div>
  )
}

export default PlantData