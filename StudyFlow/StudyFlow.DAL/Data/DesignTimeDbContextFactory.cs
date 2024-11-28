using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using StudyFlow.DAL.Data;
using System;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        // Determinar el archivo de configuración en función de la configuración de compilación
        string environmentFile;

#if DEBUG
            environmentFile = "appsettings.Development.json";
#else
        environmentFile = "appsettings.json";
#endif

        var configuration = new ConfigurationBuilder().
            SetBasePath(Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "StudyFlow.Backend")).
                AddJsonFile(environmentFile, optional: false, reloadOnChange: true).
                Build();

        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("StudyFlowDB"),
            b => b.MigrationsAssembly("StudyFlow.DAL").EnableRetryOnFailure());
        return new DataContext(optionsBuilder.Options);
    }
}