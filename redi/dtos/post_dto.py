from enum import Enum


class EnumTypePost(Enum):
    blog   = "blog"
    post   = "post"
    event  = "event"
    others = "others"
    news   = "news"


class PostDto:
    def __init__(self,title=None,event_date=None ,content=None, type_post=None,user_id=None):
        self.title = title
        self.event_date = event_date
        self.content = content
        self.type_post = type_post
        self.user_id = user_id


    @property
    def event_date(self):
        return self._event_date

    @event_date.setter
    def event_date(self, value):
        self._event_date = value
    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        self._title = value

    @property
    def content(self):
        return self._content

    @content.setter
    def content(self, value):
        if value is None:
            raise ValueError("El contenido no puede ser None")
        self._content = value

    @property
    def type_post(self):
        return self._type_post

    @type_post.setter
    def type_post(self, value):
        if value and value not in {member.value for member in EnumTypePost}:
            raise ValueError("This type of post does not exist. only allowed:  blog,post,event,news and others.")
        if value is None:
            raise ValueError("The type_post is required.")
        self._type_post = value
    
    @property
    def user_id(self):
        return self._user_id

    @user_id.setter
    def user_id(self, value):
        self._user_id = value