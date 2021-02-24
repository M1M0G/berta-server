import React from 'react';
// import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';

import './PageLayout.less';

const { Content } = Layout;

const PageLayout = ({ title, children, extra }) => {
  return (
    <Layout>
      <>
        <PageHeader title={title} extra = {extra}/>
        <Content 
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
        className="page-content" 
        >{children}</Content>
      </>
    </Layout>
  );
};

// PageLayout.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.element.isRequired,
// };

export default PageLayout;
