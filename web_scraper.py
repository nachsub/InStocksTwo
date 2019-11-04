import requests
from bs4 import BeautifulSoup
import csv

URL = "https://www.noxinfluencer.com/youtube-channel-rank/top-100-all-all-youtuber-sorted-by-subs-weekly"
r = requests.get(URL)
soup = BeautifulSoup(r.content, 'html5lib')
bodies = soup.findAll("span", {"class": "num"})
