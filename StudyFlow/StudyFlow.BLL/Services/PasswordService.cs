using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using StudyFlow.BLL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public static class PasswordService
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 10000;

        public static string HashPassword(string password)
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] salt = new byte[SaltSize];
                rng.GetBytes(salt);

                var key = new Rfc2898DeriveBytes(password, salt, Iterations).GetBytes(KeySize);

                var hash = new byte[SaltSize + KeySize];
                Array.Copy(salt, 0, hash, 0, SaltSize);
                Array.Copy(key, 0, hash, SaltSize, KeySize);

                return Convert.ToBase64String(hash);
            }
        }

        public static bool VerifyPassword(string hashedPassword, string password)
        {
            var hashBytes = Convert.FromBase64String(hashedPassword);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations).GetBytes(KeySize);

            for (int i = 0; i < KeySize; i++)
            {
                if (hashBytes[i + SaltSize] != key[i])
                    return false;
            }

            return true;
        }
    }
}