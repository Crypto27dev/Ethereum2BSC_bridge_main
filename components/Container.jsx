import React from 'react';


const Container= ({ children }) => {
  return (
    <div className={`max-w-[1440px] md:px-10 lg:px-5 xl:px-20 py-2  px-4 mx-auto `}>
      {children}
    </div>
  );
};

export default Container;
