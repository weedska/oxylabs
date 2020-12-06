
from rest_framework import viewsets, status
# Create your views here.
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from post.models import Post
from user.models import User, SavedPosts, Followers
from user.serializer import AddUserSerializer, UserSerializer, SavedPostsSerializer, FollowersSerializer
from rest_framework.authentication import TokenAuthentication


class AddUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AddUserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['Get'])
    def user_detail(self, request):
        print(request.user.first_name)
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FollowersViewSet(viewsets.ModelViewSet):
    queryset = Followers.objects.all()
    serializer_class = FollowersSerializer
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['GET'])
    def list_of_followers(self, request):
        user = request.user
        list_of_followers = Followers.objects.filter(followers=user)
        serializer = FollowersSerializer(list_of_followers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def list_of_following_users(self, request):
        user = request.user
        list_of_following_users = Followers.objects.filter(user=user)
        serializer = FollowersSerializer(list_of_following_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['Get'])
    def is_following(self, request, pk=None):
        user = request.user
        user_to_fallow = User.objects.get(id=pk)
        if Followers.objects.filter(user=user, followers=user_to_fallow):
            return Response({'follow': 1}, status=status.HTTP_200_OK)
        else:
            return Response({'follow': 0}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def follow(self, request, pk=None):
        user = request.user
        user_to_fallow = User.objects.get(id=pk)
        try:
            Followers.objects.get(user=user, followers=user_to_fallow).delete()
            response = {'message': 'You unfollowed user: {0}'.format(user_to_fallow.username)}
            return Response(response, status=status.HTTP_200_OK)
        except:
            Followers.objects.create(user=user, followers=user_to_fallow)
            response = {'message': 'You started to follow user: {0}'.format(user_to_fallow.username)}
            return Response(response, status=status.HTTP_200_OK)


class SavedPostsViewSet(viewsets.ModelViewSet):
    queryset = SavedPosts.objects.all()
    serializer_class = SavedPostsSerializer
    authentication_classes = (TokenAuthentication,)

    # Comments list

    @action(detail=True, methods=['GET'])
    def comment_list(self, request):
        user = request.user
        posts = SavedPosts.objects.filter(user=user)
        serializer = SavedPostsSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['Get'])
    def user_saved(self, request, pk=None):
        post = Post.objects.get(id=pk)
        if SavedPosts.objects.filter(post=post, user=request.user):
            return Response({'save': 1}, status=status.HTTP_200_OK)
        else:
            return Response({'save': 0}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def save(self, request, pk=None):
        user = request.user
        post = Post.objects.get(id=pk)
        try:
            SavedPosts.objects.get(user=user, post=post).delete()
            response = {'message': 'Post was removed from your list'}
            return Response(response, status=status.HTTP_200_OK)
        except:
            SavedPosts.objects.create(user=user, post=post)
            response = {'message': 'Post was saved to your list'}
            return Response(response, status=status.HTTP_200_OK)


    # Post HTTP request methods

    def create(self, request, *args, **kwargs):
        response = {'message': 'This method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        response = {'message': 'This method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None, *args, **kwargs):
        response = {'message': 'This method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs):
        response = {'message': 'This method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

