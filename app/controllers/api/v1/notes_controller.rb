module Api
  module V1
    class NotesController < ApplicationController
      protect_from_forgery with: :null_session
      #GET /users/:user_id/notes
      def index
        notes = Note.where(user_id: params[:user_id])
        render json: {status: "Success", message: "Loaded notes", data: notes}, status: :ok
      end

      #POST /users/:user_id/notes
      def create
        note = Note.new(note_params)

        if note.save
          render json: {status: "Success", message: "Saved note", data: note}, status: :ok
        else
          render json: {status: "Error", message: "Couldn't save note", data: note.errors}, status: :unprocessable_entity
        end
      end

      #DELETE /users/:user_id/notes/:id
      def destroy
        note = Note.find(params[:id])
        note.destroy
        render json: {status: "Success", message: "Deleted note", data: note}, status: :ok
      end

      #PATCH /users/:user_id/notes/:id
      def update
        note = Note.find(params[:id])

        if note.update_attributes(note_params)
          render json: {status: "Success", message: "Updated note", data: note}, status: :ok
        else
          render json: {status: "Error", message: "Couldn't update note", data: note}, status: :unprocessable_entity
        end
      end

      private

      def note_params
        params.permit(:title, :body, :user_id, :note, :updated_at)
      end

    end
  end
end
