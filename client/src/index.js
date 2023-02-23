import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/variable.css';

// 작성일자 설정을 위한 dayjs 라이브러리 및 플러그인 설정
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale('ko');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
