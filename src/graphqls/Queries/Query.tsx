import gql from 'graphql-tag';

const USER_LOGIN = gql`
  query userLogin {
    user @client
  }
`;
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const KEY_WORDS = gql`
  query getKeywords($input: PagingInput) {
    getKeywords(input: $input) {
      status
      message
      data {
        pageNum
        total
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

const PROFILES = gql`
  query profiles($input: FilterProfileInput!) {
    profiles(input: $input) {
      status
      message
      data {
        _index
        _id
        _source {
          authorId
          authorName
          authorUrl
          username
          hometown
          email
          phoneCurrent
          phoneNumber
          notesCount
          quotes
          religion
          relationship
          birthdayDate
          birthday
          birthyear
          sex
          verified
          geographic
          geographicCurrent
          meetingSex
          music
          authorAvatarUrl
          favoriteAthletes
          host
          movies
          followers
          friends
          locale
          location
          lastName
          firstName
          interests
          isUser
          type
        }
      }
      total
      skip
    }
  }
`;

const PAGES = gql`
  query pages($where: PageWhereInput, $orderBy: PageOrderByInput, $limit: Int, $skip: Int) {
    pages(where: $where, orderBy: $orderBy, limit: $limit, skip: $skip) {
      status
      message
    }
  }
`;

const GET_CRAWLER_ACCOUNTS = gql`
  query getCrawlerAccounts($input: getCrawlerAccountInput) {
    getCrawlerAccounts(input: $input) {
      status
      message
      data {
        pageNum
        total
        accounts {
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
  }
`;

const FB_SOURCES = gql`
  query getFbSource($input: getfbSourceInput) {
    getFbSources(input: $input) {
      message
      data {
        pageNum
        total
        source {
          _id
          id
          edge_type
          name
          privacy
          level
          description
          last_updated_time
          last_crawled_time
          last_edited_time
          created_time
          created_by
          edited_by
          priority
        }
      }
    }
  }
`;

export { USER_LOGIN, IS_LOGGED_IN, KEY_WORDS, PROFILES, PAGES, GET_CRAWLER_ACCOUNTS, FB_SOURCES };
