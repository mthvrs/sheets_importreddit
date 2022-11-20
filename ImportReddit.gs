// Maintain the old names of the function for legacy purposes
// These won't have fancy autocomplete, but should prevent old code from breaking
function subreddit_info(subreddit, attribute) { return IMPORTSUB(subreddit, attribute) }
function user_info(subreddit, attribute) { return IMPORTUSER(subreddit, attribute) }

/**
 * Reddit — Returns a given attribute's value for a subreddit
 *
 * @param {"me_irl"} subreddit The subreddit's name (eg. "me_irl")
 * @param {"title"} attribute The attribute you'd like to retrieve (eg. "title")
 * @return {selfies of the soul} The requested attribute's value for this subreddit (eg. "selfies of the soul")
 * @customfunction
 */
 function IMPORTSUB(subreddit, attribute) {
  var url = "https://www.reddit.com/r/" + subreddit + "/about.json";
  var params = {
    'method' : 'GET',
  };
  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  var obj = response["data"];
  var parts = attribute.split(".");
  for (var part of parts) {
    obj = obj[part];
  }
  return obj ?? "null";
}

/**
 * Reddit — Returns a given attribute's value for a user
 *
 * @param {"spez"} username The user's name (eg. "spez")
 * @param {"is_employee"} attribute The attribute you'd like to retrieve (eg. "is_employee")
 * @return {TRUE} The requested attribute's value for this user (eg. "TRUE")
 * @customfunction
 */
function IMPORTUSER(username, attribute) {
  var url = "https://www.reddit.com/user/" + username + "/about.json";
  var params = {
    'method' : 'GET',
  };
  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  var obj = response["data"];
  var parts = attribute.split(".");
  for (var part of parts) {
    obj = obj[part];
  }
  return obj ?? "null";
}

/**
 * Reddit — Returns TRUE if user is mod of subreddit
 *
 * @param {"spez"} username The user's name (eg. "spez")
 * @param {"announcements"} subreddit The subreddit you'd like to check (eg. "announcements")
 * @return {TRUE} The requested subreddit's moderator status for this user (eg. "TRUE")
 * @customfunction
 */
function IMPORTUSER_ISMOD(username, subreddit) {
  var url = "https://www.reddit.com/user/" + username + "/moderated_subreddits.json";
  var params = {
    'method' : 'GET',
  };
  var response = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  return !! response.data.find(d => d.display_name === subreddit);
}

/**
 * Reddit — Returns a given attribute's value for a post
 *
 * @param {"cq1q2"} post_id The post's id (eg. "cq1q2")
 * @param {"ups"} attribute The attribute you'd like to retrieve (eg. "ups")
 * @return {2668} The requested attribute's value for this post (eg. "2668")
 * @customfunction
 */
function IMPORTPOST(post_id, attribute) {
  var url = "https://www.reddit.com/comments/" + post_id + ".json";
  var params = {
    'method' : 'GET',
  };
  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  var obj = response[0].data.children[0].data;
  var parts = attribute.split(".");
  for (var part of parts) {
    obj = obj[part];
  }
  return obj ?? "null";
}

/**
 * Reddit — Returns a given attribute's value for a comment
 *
 * @param {"cq1q2"} post_id The post's id (eg. "cq1q2")
 * @param {"c0udtca"} comment_id The comment's id (eg. "c0udtca")
 * @param {"author"} attribute The attribute you'd like to retrieve (eg. "author")
 * @return {raldi} The requested attribute's value for this comment (eg. "raldi")
 * @customfunction
 */
function IMPORTCOMMENT(post_id, comment_id, attribute) {
  var url = "https://www.reddit.com/comments/" + post_id + "/comment/" + comment_id + ".json";
  var params = {
    'method' : 'GET',
  };
  var response = JSON.parse(UrlFetchApp.fetch(url, params));
  var obj = response[1].data.children[0].data;
  var parts = attribute.split(".");
  for (var part of parts) {
    obj = obj[part];
  }
  return obj ?? "null";
}
