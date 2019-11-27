module Api
  module V1
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session
      #GET /users
      def index
        users = User.all
        render json: {status: "Success", message: "Loaded users", data: users}, status: :ok
      end

      #GET /users/:id
      def show
        user = User.find(params[:id])
        render json: {status: "Success", message: "Loaded the user info", data: user}, status: :ok
      end

      #POST /users
      def create
        user = User.new(user_params)

        if user.save
          render json: {status: "Success", message: "Saved user", data: user}, status: :ok
        else
          render json: {status: "Error", message: "Couldn't save user", data: user.errors}, status: :unprocessable_entity
        end
      end

      #DELETE /users/:id
      def destroy
        user = User.find(params[:id])
        user.destroy
        render json: {status: "Success", message: "Deleted user", data: user}, status: :ok
      end

      #PATCH /users/:id
      def update
        user = User.find(params[:id])

        if user.update_attributes(user_params)
          render json: {status: "Success", message: "Updated user", data: user}, status: :ok
        else
          render json: {status: "Error", message: "Couldn't update user", data: user}, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.permit(:username, :email)
      end

    end
  end
end
