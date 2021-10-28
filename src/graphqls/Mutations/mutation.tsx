import gql from "graphql-tag";

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      status
      message
      accessToken
      refreshToken
      data {
        _id
        username
        firstName
        lastName
        email
        phone
        avatar
        permissions {
          group
          roles
        }
        status
        expiresDate
        lastActivity
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
    }
  }
`;

// KeyWords
const CREATE_KEYWORD = gql`
  mutation createKeyword($input: keywordInput) {
    createKeyword(input: $input) {
      status
      message
      data {
        _id
        keyword
        search_type
        domain
        last_google_search_crawl_time
        last_facebook_search_crawl_time
        last_youtube_search_crawl_time
        last_edit_time
      }
    }
  }
`;

const USER_LOGIN = gql`
  query userLogin {
    user @client
  }
`;

const DELETE_KEYWORDS = gql`
  mutation deleteKeywords($input: deleteKeywordInput) {
    deleteKeywords(input: $input) {
      status
      message
      data {
        _id
        keyword
        search_type
        domain
        last_edit_time
        last_google_search_crawl_time
        last_youtube_search_crawl_time
        last_facebook_search_crawl_time
      }
    }
  }
`;

const EDIT_KEYWORD = gql`
  mutation editKeyword($input: keywordInput) {
    editKeyword(input: $input) {
      status
      message
      data {
        pageNum
        keywords {
          _id
          keyword
          search_type
          domain
          last_edit_time
          last_google_search_crawl_time
          last_youtube_search_crawl_time
          last_facebook_search_crawl_time
        }
      }
    }
  }
`;

// Crawler Accounts

const CREATE_CRAWLER_ACCOUNTS = gql`
  mutation createCrawlerAccounts($input: [createCrawlerAccInput]) {
    createCrawlerAccounts(input: $input) {
      status
      message
      data {
        _id
        username
        email
        phone
        password
        token
        cookie
        uid
        platform
        domain
        status
        created_by
        edited_by
        joined_group
        active_on
        priority
        is_locked
        locked_time
        lock_code
        error
        created_time
        updated_time
      }
    }
  }
`;

const UPDATE_CRAWLER_ACCOUNT = gql`
  mutation updateCrawlerAccount($input: updateCrawlAccountInput) {
    updateCrawlerAccount(input: $input) {
      status
      message
      data {
        _id
        username
        email
        phone
        password
        token
        cookie
        uid
        platform
        domain
        status
        created_by
        edited_by
        joined_group
        active_on
        priority
        is_locked
        locked_time
        lock_code
        error
        created_time
        updated_time
      }
    }
  }
`;

const DELETE_CRAWLER_ACCOUNTS = gql`
  mutation deleteCrawlerAccounts($input: deleteCrawlerAccountInput) {
    deleteCrawlerAccounts(input: $input) {
      status
      message
      data {
        _id
        username
        email
        phone
        password
        token
        cookie
        uid
        platform
        domain
        status
        created_by
        edited_by
        joined_group
        active_on
        priority
        is_locked
        locked_time
        lock_code
        error
        created_time
        updated_time
      }
    }
  }
`;

const CREATE_SOURCE = gql`
  mutation createSource($input: [createFbSourceInput]) {
    createSource(input: $input) {
      status
      message
      data {
        _id
        id
        name
        priority
        privacy
        edge_type
        last_updated_time
        last_crawled_time
        created_time
        last_edited_time
        created_by
        edited_by
      }
    }
  }
`;

const DELETE_SOURCE = gql`
  mutation deleteSources($input: deleteMultiSourceInput) {
    deleteSources(input: $input) {
      status
      message
      data {
        _id
        id
        name
        priority
        privacy
        edge_type
        last_updated_time
        last_crawled_time
        created_time
        last_edited_time
        created_by
        edited_by
      }
    }
  }
`;
const UPDATE_SOURCES = gql`
  mutation updateSources($input: updateMultiSourceInput) {
    updateSources(input: $input) {
      status
      message
      data {
        _id
        id
        name
        priority
        privacy
        edge_type
        last_updated_time
        last_crawled_time
        created_time
        last_edited_time
        created_by
        edited_by
      }
    }
  }
`;

export {
  LOGIN,
  CREATE_KEYWORD,
  DELETE_KEYWORDS,
  EDIT_KEYWORD,
  CREATE_CRAWLER_ACCOUNTS,
  UPDATE_CRAWLER_ACCOUNT,
  DELETE_CRAWLER_ACCOUNTS,
  CREATE_SOURCE,
  DELETE_SOURCE,
  UPDATE_SOURCES,
};
