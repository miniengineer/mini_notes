module Api
  module V1
    class NotesController < ApplicationController
      protect_from_forgery with: :null_session
      #GET /notes
      def index
        notes = Note.all
        render json: {status: "Success", message: "Loaded notes", data: notes}, status: :ok
      end

      #GET /notes/:id (get notes by user_id)
      def show
        note = Note.where(user_id: params[:id])
        render json: {status: "Success", message: "Loaded the note info", data: note}, status: :ok
      end

      #POST /notes
      def create
        note = Note.new(note_params)

        if note.save
          render json: {status: "Success", message: "Saved note", data: note}, status: :ok
        else
          render json: {status: "Error", message: "Couldn't save note", data: note.errors}, status: :unprocessable_entity
        end
      end

      #DELETE /notes/:id
      def destroy
        note = Note.find(params[:id])
        note.destroy
        render json: {status: "Success", message: "Deleted note", data: note}, status: :ok
      end

      #PATCH /notes/:id
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
        params.permit(:title, :body, :user_id)
      end

    end
  end
end
