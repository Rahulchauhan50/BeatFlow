import React, { useRef } from 'react';

import 'tailwindcss/tailwind.css';

const UserProfile = ({setUserPage,IsUserPage}) => {
  const divRef = useRef(null);
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740',
  };

  const history = [
    { song: 'Song 1', artist: 'Artist 1', year: '2022' },
    { song: 'Song 2', artist: 'Artist 2', year: '2023' },
    { song: 'Song 2', artist: 'Artist 2', year: '2023' },
  ];

  const favoriteSongs = [
    { song: 'Favorite Song 1', artist: 'Favorite Artist 1', year: '2020' },
    { song: 'Favorite Song 2', artist: 'Favorite Artist 2', year: '2021' },
    { song: 'Favorite Song 2', artist: 'Favorite Artist 2', year: '2021' },
  ];

  return (
    <div className="min-h-screen bg-transparent bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-8">
          <div className="max-w-3xl mx-auto">
            {/* User Information Section */}
            <div className="bg-transparent shadow rounded-lg overflow-hidden">
              <div className="flex items-center justify-center bg-transparent mb-14 bg-gray-200 h-40">
                <img
                  ref={divRef}
                  className="h-32 w-32 rounded-full object-cover"
                  src={userInfo.profileImage}
                  alt={userInfo.name}
                />
              </div>
              <div className="bg-gradient-to-tr from-[#ff5b5b] to-[#44caff] px-4 rounded-3xl py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {userInfo.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-900">
                  {userInfo.email}
                </p>
              </div>
            </div>

            {/* History Section */}
            <div className="mt-16">
            <div className='flex justify-between'>
              <h2 className="text-lg font-medium text-gray-300">
                History
              </h2>
              <h2 className="text-sm font-medium text-gray-400">
                See more
              </h2>
              </div> 
              <ul className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                  >
                    <div className="w-full flex items-center justify-between p-4 space-x-4">
                      <div className="flex-1 truncate">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.song}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {item.artist} - {item.year}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Favorite Songs Section */}
            <div className="mt-16">
            <div className='flex justify-between'>
              <h2 className="text-lg font-medium text-gray-300">
                Favorite songs
              </h2>
              <h2 className="text-sm font-medium text-gray-400">
                See more
              </h2>
              </div>
              <ul className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteSongs.map((item, index) => (
                  <li
                    key={index}
                    className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                  >
                    <div className="w-full flex items-center justify-between p-4 space-x-4">
                      <div className="flex-1 truncate">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.song}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {item.artist} - {item.year}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-16">
              <div className='flex justify-between'>
              <h2 className="text-lg font-medium text-gray-300">
                Favorite Artists
              </h2>
              <h2 className="text-sm font-medium text-gray-400">
                See more
              </h2>
              </div>
              <ul className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteSongs.map((item, index) => (
                  <li
                    key={index}
                    className="col-span-1 bg-transparent rounded-lg shadow divide-y divide-gray-200"
                  >
                    <div className="w-full flex items-center justify-between p-4 space-x-4">
                      <img className='h-14 w-14 rounded-full' alt='profile' src='https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740'/>
                      <div className="flex-1 truncate">
                        <div className="text-sm font-medium text-gray-100 truncate">
                          {item.song}
                        </div>
                        <div className="text-sm text-gray-100 truncate">
                          {item.artist} - {item.year}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
