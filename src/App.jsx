// App.js

import React from 'react';
import { FileMenu } from './components/FileMenu';
import { FileDetails } from './components/FileDetails';
import { Timeline } from './components/Timeline';

function App() {
  const files = ['File 1', 'File 2', 'File 3']; // Örnek dosyalar

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sol Menü */}
        <div className="w-1/5 bg-gray-800 text-white p-4 overflow-y-auto">
          <FileMenu files={files} />
        </div>

        {/* Orta Alan */}
        <div className="flex-1 p-4 overflow-auto">
          <FileDetails />  {/* Dosya detaylarını Redux'tan alıp gösteriyoruz */}
        </div>
      </div>

      {/* Alt Kısım - Timeline (Full width) */}
      <div className="w-full bg-gray-200 p-4 overflow-x-auto">
        <Timeline />
      </div>
    </div>
  );
}

export default App;
