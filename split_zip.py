import zipfile
import os
import shutil

# Fungsi untuk membagi folder menjadi beberapa batch
def split_folders(zip_path, output_dir, batch_size=500):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # Ekstrak seluruh folder dalam zip
        zip_ref.extractall(output_dir)

    # Dapatkan semua folder yang ada di dalam folder markdown
    markdown_dir = os.path.join(output_dir, 'markdown')
    folders = [f for f in os.listdir(markdown_dir) if os.path.isdir(os.path.join(markdown_dir, f))]

    # Proses pembagian folder ke dalam batch
    batch_num = 1
    for i in range(0, len(folders), batch_size):
        batch_folders = folders[i:i + batch_size]
        batch_zip_name = f"content_{batch_num}.zip"
        batch_zip_path = os.path.join(output_dir, batch_zip_name)

        # Membuat zip baru untuk batch tersebut
        with zipfile.ZipFile(batch_zip_path, 'w', zipfile.ZIP_DEFLATED) as batch_zip:
            for folder in batch_folders:
                folder_path = os.path.join(markdown_dir, folder)
                # Tambahkan folder dan isinya ke dalam zip
                for root, dirs, files in os.walk(folder_path):
                    for file in files:
                        file_path = os.path.join(root, file)
                        arcname = os.path.relpath(file_path, markdown_dir)
                        batch_zip.write(file_path, arcname)

        print(f"Created {batch_zip_name}")
        batch_num += 1

# Tentukan path zip dan folder tujuan
zip_path = 'markdown.zip'
output_dir = 'output'

# Pastikan folder output ada
os.makedirs(output_dir, exist_ok=True)

# Jalankan fungsi untuk membagi folder
split_folders(zip_path, output_dir)