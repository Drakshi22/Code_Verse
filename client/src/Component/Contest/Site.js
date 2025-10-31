const list = [["LeetCode", "leetcode.com", "https://leetcode.com"],
["CodeForces", "codeforces.com", "https://codeforces.com"],
  ["GeeksForGeeks", "geeksforgeeks.org", "https://www.geeksforgeeks.org"],
   ["CodeChef", "codechef.com", "https://codechef.com"],
    ["Naukri Code360", "naukri.com/code360", "https://www.naukri.com/code360"], 
     ["TopCoder", "topcoder.com", "https://topcoder.com"], 
      ["AtCoder", "atcoder.jp", "https://atcoder.jp"]]

const sites = {
    CodeForces: { name: "CodeForces", imageurl: "/siteimage/codeforces.png", url: "https://codeforces.com", apiSuffix: "codeforces.com" },
    TopCoder: { name: "TopCoder", imageurl: "/siteimage/top_coder.png", url: "https://topcoder.com", apiSuffix: "topcoder.com" },
    AtCoder: { name: "AtCoder", imageurl: "/siteimage/at_coder.png", url: "https://atcoder.jp", apiSuffix: "atcoder.com" },
    CodeChef: { name: "CodeChef", imageurl: "/siteimage/code_chef.png", url: "https://codechef.com", apiSuffix: "codechef.com" },
    GFG: { name: "GeeksForGeeks", imageurl: "/siteimage/gfgwhite.png", url: "https://www.geeksforgeeks.org", apiSuffix: "geeksforgeeks.org" },
    Naukri: { name: "Naukri code 360", imageurl: "/siteimage/code360.jpeg", url: "https://www.naukri.com/code360", apiSuffix: "naukri.com/code360" },
    LeetCode: { name: "LeetCode", imageurl: "/siteimage/leet_code.png", url: "https://leetcode.com", apiSuffix: "leetcode.com" }   
}

function getImageUrl(siteName) {
    if (siteName == "codeforces.com") {
        return sites.CodeForces.imageurl;
    }
    else if (siteName == "topcoder.com") {
        return sites.TopCoder.imageurl;
    }
    else if (siteName == "atcoder.jp") {
        return sites.AtCoder.imageurl;
    }
    else if (siteName == "codechef.com") {
        return sites.CodeChef.imageurl;
    }
    else if (siteName == "naukri.com/code360") {
        return sites.Naukri.imageurl;
    }
    else if (siteName == "geeksforgeeks.org") {
        return sites.GFG.imageurl;
    }
    else if (siteName == "leetcode.com") {
        return sites.LeetCode.imageurl;
    }
}
function getSiteUrl(siteName) {
    if (siteName == "codeforces.com") {
        return sites.CodeForces.url;
    }
    else if (siteName == "topcoder.com") {
        return sites.TopCoder.url;
    }
    else if (siteName == "atcoder.jp") {
        return sites.AtCoder.url;
    }
    else if (siteName == "codechef.com") {
        return sites.CodeChef.url;
    }
    else if (siteName == "naukri.com/code360") {
        return sites.Naukri.url;
    }
    else if (siteName == "geeksforgeeks.org") {
        return sites.GFG.url;
    }
    else if (siteName == "leetcode.com") {
        return sites.LeetCode.url;
    }
}

function getsite() {
    return sites
}
export { getImageUrl, getSiteUrl, getsite, sites, list };