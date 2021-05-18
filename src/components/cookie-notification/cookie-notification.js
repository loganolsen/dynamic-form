import React, { useState, useEffect } from 'react';
import { setCookies, checkCookies } from 'cookies-next';
import { Container, Image, Button } from 'semantic-ui-react';
import './cookie-notification.less';

const CookieNotification = ({
  readMore,
  showIcon,
  inverted,
  cookieIconUrl = '/static/images/cookie-icon.svg',
  hasCookieCallback = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!checkCookies(null, 'cookie'));
    hasCookieCallback(checkCookies(null, 'cookie'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccepted = () => {
    setVisible(false);
    setCookies(null, 'cookie', 'accepted', { expires: 9999 }, 'secure');
    hasCookieCallback(checkCookies(null, 'cookie'));
  };

  return (
    <>
      {visible && (
        <Container text className={`cookie-popup ${inverted && 'dark-mode'}`}>
          <div>
            {showIcon && <Image src={cookieIconUrl} size="tiny" />}
            <p>We use cookies to improve your experience and to analyse our traffic.</p>
          </div>
          <div className="cookie-buttons">
            <Button primary content="Accept" onClick={() => handleAccepted()} />
            {readMore && (
              <a primary href={readMore}>
                Read more
                <span className="sr-only">about our cookie policy</span>
              </a>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default CookieNotification;
